// ============ src/features/auth/shared/services/auth.service.ts ====================================
import { apiClient } from "@/lib/api/base";
import {
  AuthResponse,
  ChangePasswordResponse,
  DeleteAccountResponse,
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

// Cookie helper functions
const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const deleteAllAuthCookies = () => {
  const cookies = [
    "accessToken",
    "refreshToken",
    "userRole",
    "role",
    "better-auth.session_token",
    "token",
  ];

  cookies.forEach(deleteCookie);
  console.log("🗑️ All auth cookies cleared");
};

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

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

  //  FIXED LOGOUT - Proper cookie clearing
  logout: async (): Promise<void> => {
    try {
      console.log("📤 [auth.service] Attempting logout...");

      // Clear cookies FIRST (before API call to ensure it happens)
      deleteAllAuthCookies();

      // Clear sessionStorage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("better-auth.session_token");
      }

      // Clear localStorage if any auth data exists
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("user");
      }

      // Try to call logout API (don't wait for it, but attempt)
      try {
        await apiClient.post("/auth/logout", {}, { timeout: 3000 });
        console.log("✅ [auth.service] Logout API call successful");
      } catch (apiError) {
        // Don't fail if API is unreachable - we already cleared local data
        console.warn(
          "⚠️ [auth.service] Logout API failed, but local data cleared:",
          apiError,
        );
      }

      // Dispatch custom event for auth state change
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auth-state-change", {
            detail: { isAuthenticated: false, role: null },
          }),
        );
      }

      console.log("✅ [auth.service] Logout completed successfully");
    } catch (error) {
      console.error("❌ [auth.service] Logout error:", error);
      // Still clear cookies even if error occurs
      deleteAllAuthCookies();
      throw error;
    }
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

  // Delete Account
  deleteAccount: async (password: string): Promise<DeleteAccountResponse> => {
    const response = await apiClient.delete("/auth/account", {
      data: { password },
    });
    return response.data;
  },
};
