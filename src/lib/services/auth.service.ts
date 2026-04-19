import { handleApiError } from "@/lib/api/error-handler";
import { apiClient } from "../api/base";
import { AuthResponse, LoginPayload, RegisterPayload } from "../api/auth.api";

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post("/auth/login", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

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
