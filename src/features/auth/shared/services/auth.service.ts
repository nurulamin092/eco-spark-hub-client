import { apiClient } from "@/lib/api/base";
import {
  AuthResponse,
  ChangePasswordResponse,
  ForgotPasswordResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadAvatarResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyOtpResponse,
} from "../types/auth.types";
import {
  RevokeAllSessionsResponse,
  RevokeSessionResponse,
  SessionsResponse,
} from "../../sessions/types/session.types";

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },
  // Register
  register: async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
  // Email Verification
  verifyEmail: async (
    data: VerifyEmailRequest,
  ): Promise<VerifyEmailResponse> => {
    const response = await apiClient.post("/auth/verify-email", data);
    return response.data;
  },

  // Forgot Password - Request OTP
  forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post("/auth/forget-password", { email });
    return response.data;
  },

  // Verify OTP
  verifyOtp: async (email: string, otp: string): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post("/auth/verify-otp", { email, otp });
    return response.data;
  },
  // Resend OTP
  resendOtp: async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
    const response = await apiClient.post("/auth/resend-otp", data);
    return response.data;
  },

  // Reset Password
  resetPassword: async (
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post("/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  },

  // Change Password
  changePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<ChangePasswordResponse> => {
    const response = await apiClient.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Update Profile
  updateProfile: async (
    data: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> => {
    const response = await apiClient.patch("/auth/profile", data);
    return response.data;
  },

  // Upload Avatar
  uploadAvatar: async (file: File): Promise<UploadAvatarResponse> => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await apiClient.post("/auth/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  // Get Current User
  getMe: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  // Sessions
  getSessions: async (): Promise<SessionsResponse> => {
    const response = await apiClient.get("/auth/sessions");
    return response.data;
  },

  // Revoke Session
  revokeSession: async (sessionId: string): Promise<RevokeSessionResponse> => {
    const response = await apiClient.delete(`/auth/sessions/${sessionId}`);
    return response.data;
  },

  // Revoke All Sessions
  revokeAllSessions: async (): Promise<RevokeAllSessionsResponse> => {
    const response = await apiClient.delete("/auth/sessions");
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
};
