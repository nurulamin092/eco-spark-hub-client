import { apiClient } from "@/lib/api/client";
import { handleApiError, ApiError } from "@/lib/api/error-handler";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "MEMBER" | "ADMIN" | "SUPER_ADMIN";
  image?: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * অথ এপিআই কল - টোকেন কুকিতে সংরক্ষিত হয়
 */
export const authService = {
  /**
   * লগইন করুন - টোকেন সার্ভার সাইড কুকিতে সেট হবে
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post("/auth/login", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * রেজিস্টার করুন
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

 
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  getMe: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
