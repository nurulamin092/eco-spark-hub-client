import { apiClient } from "./base";

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: { id: string; name: string; email: string; role: string };
    accessToken: string;
    refreshToken: string;
  };
}

export const authApi = {
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

  logout: async () => {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  getMe: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
