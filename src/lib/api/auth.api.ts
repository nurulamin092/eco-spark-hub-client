/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./base";
// Import types from single source of truth
import type {
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
  UpdateProfileRequest,
} from "@/features/auth/shared/types/auth.types";

// Re-export for convenience (optional)
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
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  //?=============================

  async getMe(): Promise<User> {
    try {
      const response = await apiClient.get("/auth/me");

      // Handle different response structures
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
      const message = error.response?.data?.message || error.message;

      // Log only in development and not for 429
      if (process.env.NODE_ENV === "development" && status !== 429) {
        console.warn(`getMe failed (${status}):`, message);
      }

      // Create a meaningful error
      const customError = new Error(message);
      (customError as any).status = status;
      throw customError;
    }
  }

  //?.=======================

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
