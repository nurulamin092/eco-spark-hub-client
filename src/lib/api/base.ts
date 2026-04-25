// ============ src/lib/api/base.ts ============
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { env } from "../config/env";

interface FailedRequest {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

// Cookie helper functions - Production grade
const setCookie = (name: string, value: string, maxAgeDays: number = 7) => {
  if (typeof document === "undefined") return;

  const isProduction = process.env.NODE_ENV === "production";
  const expires = new Date();
  expires.setTime(expires.getTime() + maxAgeDays * 24 * 60 * 60 * 1000);

  const cookieParts = [
    `${name}=${value}`,
    `expires=${expires.toUTCString()}`,
    `path=/`,
    `SameSite=Lax`,
    `max-age=${maxAgeDays * 24 * 60 * 60}`,
  ];

  if (isProduction) {
    cookieParts.push(`Secure`);
  }

  document.cookie = cookieParts.join("; ");
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// JWT Decode helper with proper error handling
const decodeJWT = (
  token: string,
): { role: string; exp: number; [key: string]: unknown } | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return {
      role: payload.role || payload.Role || payload.userRole || "MEMBER",
      exp: payload.exp || 0,
      ...payload,
    };
  } catch (error) {
    console.error("JWT Decode failed:", error);
    return null;
  }
};

class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];

  private constructor() {
    this.client = axios.create({
      baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add token to header for better-auth compatibility
        if (typeof document !== "undefined") {
          const accessToken = this.getCookie("accessToken");
          if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        if (process.env.NODE_ENV === "development") {
          console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`📥 ${response.status} ${response.config.url}`);
        }

        // Handle login/register response - CRITICAL SECTION
        if (
          response.config.url?.includes("/auth/login") ||
          response.config.url?.includes("/auth/register")
        ) {
          const data = response.data?.data;
          if (data?.accessToken) {
            this.handleAuthResponse(data);
          }
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        const isAuthEndpoint = originalRequest.url?.includes("/auth/");
        const isLoginEndpoint = originalRequest.url?.includes("/auth/login");

        if (isLoginEndpoint && error.response?.status === 401) {
          return Promise.reject(error);
        }

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isAuthEndpoint
        ) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshTokens();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            this.clearAuthAndRedirect();
            return Promise.reject(refreshError);
          }
        }

        if (error.code === "ERR_NETWORK") {
          console.error("Network error - backend might be down");
          return Promise.reject(new Error("Unable to connect to server"));
        }

        return Promise.reject(error);
      },
    );
  }

  private getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  private handleAuthResponse(data: {
    accessToken: string;
    refreshToken?: string;
    token?: string;
    user?: { role: string };
  }): void {
    console.log("🔄 [base.ts] Handling auth response...");

    const accessToken = data.accessToken || data.token;
    if (!accessToken) {
      console.error("No access token in response");
      return;
    }

    // Decode token to get role
    const decoded = decodeJWT(accessToken);
    const userRole = decoded?.role || data.user?.role || "MEMBER";

    console.log(`✅ [base.ts] User role extracted: ${userRole}`);

    // Set all cookies with proper expiration
    setCookie("accessToken", accessToken, 1); // 1 day for access token
    setCookie("userRole", userRole, 7); // 7 days for role

    if (data.refreshToken) {
      setCookie("refreshToken", data.refreshToken, 30); // 30 days for refresh token
    }

    // Store role in sessionStorage as backup
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("userRole", userRole);
      sessionStorage.setItem("accessToken", accessToken);
    }

    console.log("✅ [base.ts] All cookies set successfully");
    console.log("📝 [base.ts] Current cookies:", document.cookie);

    // Dispatch custom event for auth state change
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth-state-change", {
          detail: { isAuthenticated: true, role: userRole },
        }),
      );
    }
  }

  private async refreshTokens(): Promise<string | null> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = this.getCookie("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await this.client.post(
        "/auth/refresh-token",
        { refreshToken },
        { timeout: 10000 },
      );

      const newAccessToken =
        response.data?.data?.accessToken || response.data?.accessToken || null;

      if (newAccessToken) {
        setCookie("accessToken", newAccessToken, 1);

        // Update role from new token
        const decoded = decodeJWT(newAccessToken);
        if (decoded?.role) {
          setCookie("userRole", decoded.role, 7);
          if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem("userRole", decoded.role);
          }
        }

        this.processQueue(null, newAccessToken);
        return newAccessToken;
      }

      throw new Error("No access token received");
    } catch (error) {
      this.processQueue(error, null);
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  private processQueue(error: unknown, token: string | null): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private clearAuthAndRedirect(): void {
    if (typeof window !== "undefined") {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("userRole");
      deleteCookie("better-auth.session_token");

      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("accessToken");
      }

      // Dispatch auth change event
      window.dispatchEvent(
        new CustomEvent("auth-state-change", {
          detail: { isAuthenticated: false, role: null },
        }),
      );

      window.location.href = "/login";
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = ApiClient.getInstance().getClient();
