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

  async getMe(): Promise<User> {
    const response = await apiClient.get("/auth/me");
    return response.data.data;
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
