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
      timeout: 15000,
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

        // Save tokens from login/register response
        if (
          response.config.url?.includes("/auth/login") ||
          response.config.url?.includes("/auth/register")
        ) {
          const data = response.data?.data;
          if (data?.accessToken && data?.refreshToken) {
            this.saveTokensToCookies(
              data.accessToken,
              data.refreshToken,
              data.token,
            );
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
            await this.refreshTokens();
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

  private saveTokensToCookies(
    accessToken: string,
    refreshToken: string,
    sessionToken?: string,
  ): void {
    if (typeof document === "undefined") return;

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = `path=/; max-age=900; ${
      isProduction ? "Secure; " : ""
    }SameSite=Lax`;
    const longCookieOptions = `path=/; max-age=604800; ${
      isProduction ? "Secure; " : ""
    }SameSite=Lax`;

    document.cookie = `accessToken=${accessToken}; ${cookieOptions}`;
    document.cookie = `refreshToken=${refreshToken}; ${longCookieOptions}`;

    if (sessionToken) {
      document.cookie = `better-auth.session_token=${sessionToken}; path=/; max-age=86400; ${
        isProduction ? "Secure; " : ""
      }SameSite=Lax`;
    }

    // Extract and save user role - CRITICAL
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      if (payload.role) {
        document.cookie = `userRole=${payload.role}; ${cookieOptions}`;
        console.log(`✅ [base.ts] userRole cookie set to: ${payload.role}`);
      } else {
        console.warn("[base.ts] No role found in token payload");
      }
    } catch (error) {
      console.error("[base.ts] Failed to extract user role:", error);
    }

    console.log("[base.ts] All tokens saved to cookies");
    console.log("[base.ts] Current cookies:", document.cookie);
  }

  private async refreshTokens(): Promise<string | null> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const response = await this.client.post(
        "/auth/refresh-token",
        {},
        { timeout: 10000 },
      );

      const newAccessToken = response.data?.data?.accessToken ?? null;

      if (newAccessToken) {
        const isProduction = process.env.NODE_ENV === "production";
        document.cookie = `accessToken=${newAccessToken}; path=/; max-age=900; ${
          isProduction ? "Secure; " : ""
        }SameSite=Lax`;

        this.processQueue(null, newAccessToken);
      } else {
        throw new Error("No access token received");
      }

      return newAccessToken;
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
      const cookies = [
        "accessToken",
        "refreshToken",
        "better-auth.session_token",
        "userRole",
      ];
      cookies.forEach((name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      window.location.href = "/login";
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = ApiClient.getInstance().getClient();
