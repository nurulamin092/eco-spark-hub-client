/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/lib/api/auth.api.ts ============
import { apiClient, deleteCookie } from "./base";
import type {
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
  UpdateProfileRequest,
} from "@/features/auth/shared/types/auth.types";

export type {
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
};

// Force clear all auth cookies with aggressive strategy
const forceClearAllAuthCookies = () => {
  if (typeof document === "undefined") return;

  console.log("🗑️ Force clearing all auth cookies...");

  // Complete list of cookies to clear
  const cookiesToDelete = [
    "accessToken",
    "refreshToken",
    "userRole",
    "role",
    "better-auth.session_token",
    "token",
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
    "connect.sid",
    "session",
  ];

  // Multiple clearing strategies
  cookiesToDelete.forEach((cookieName) => {
    // Standard delete
    deleteCookie(cookieName);

    // Clear with different paths
    ["/", "/api", "/admin", "/dashboard", "/member"].forEach((path) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; SameSite=Lax;`;
    });

    // Clear with domain variations for localhost
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`;
  });

  console.log(" All auth cookies force cleared");
};

class AuthApiService {
  private static instance: AuthApiService;

  private constructor() {}

  static getInstance(): AuthApiService {
    if (!AuthApiService.instance) {
      AuthApiService.instance = new AuthApiService();
    }
    return AuthApiService.instance;
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    console.log("📤 [auth.api] Login request for:", payload.email);
    const response = await apiClient.post("/auth/login", payload);
    console.log("📥 [auth.api] Login response status:", response.status);
    return response.data;
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    console.log(" [auth.api] Register request for:", payload.email);
    const response = await apiClient.post("/auth/register", payload);
    console.log(" [auth.api] Register response status:", response.status);
    return response.data;
  }

  async logout(): Promise<void> {
    console.log(" [auth.api] Starting logout...");
    forceClearAllAuthCookies();
    try {
      // Call logout API with longer timeout
      await apiClient.post("/auth/logout", {}, { timeout: 5000 });
      console.log(" Logout API successful");
    } catch (error: any) {
      console.warn(" Logout API error:", error.message);
      // Continue with client-side cleanup
    }

    // Client-side cookie clearing - aggressive but necessary
    const cookiesToDelete = [
      "accessToken",
      "refreshToken",
      "better-auth.session_token",
      "token",
      "userRole",
      "role",
    ];

    cookiesToDelete.forEach((name) => {
      // Multiple clearing strategies
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
      document.cookie = `${name}=; max-age=0; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
    });

    // Clear storage
    sessionStorage.clear();
    localStorage.clear();

    console.log(" Logout complete, cookies:", document.cookie);
  }
  async getMe(): Promise<User> {
    try {
      console.log(" [auth.api] Getting current user...");
      const response = await apiClient.get("/auth/me");

      if (response.data?.data) {
        return response.data.data;
      }
      if (response.data?.user) {
        return response.data.user;
      }
      if (response.data) {
        return response.data;
      }

      throw new Error("Invalid response structure");
    } catch (error: any) {
      const status = error.response?.status;
      console.log(` [auth.api] getMe failed with status: ${status}`);
      throw error;
    }
  }

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await apiClient.post("/auth/change-password", payload);
  }

  async updateProfile(payload: UpdateProfileRequest): Promise<User> {
    const response = await apiClient.patch("/auth/profile", payload);
    return response.data.data.user;
  }

  async verifyEmail(email: string, otp: string): Promise<void> {
    await apiClient.post("/auth/verify-email", { email, otp });
  }

  async forgetPassword(email: string): Promise<void> {
    await apiClient.post("/auth/forget-password", { email });
  }

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<void> {
    await apiClient.post("/auth/reset-password", { email, otp, newPassword });
  }
}

export const authApi = AuthApiService.getInstance();
