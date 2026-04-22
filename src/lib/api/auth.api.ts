/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/lib/api/auth.api.ts ============
import { apiClient } from "./base";
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
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
      console.log("✅ [auth.api] Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async getMe(): Promise<User> {
    try {
      console.log("📤 [auth.api] Getting current user...");
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
      console.log(`📥 [auth.api] getMe failed with status: ${status}`);
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
