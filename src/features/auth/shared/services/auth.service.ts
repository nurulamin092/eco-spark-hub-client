import { apiClient } from "@/lib/api/base";
import {
  AuthResponse,
  ChangePasswordResponse,
  ForgotPasswordResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyOtpResponse,
} from "../types/auth.types";

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

  // Get Current User
  getMe: async () => {
    const response = await apiClient.get("/auth/me");
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
