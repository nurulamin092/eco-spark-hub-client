import axios from "axios";
import { env } from "../config/env";

export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor - add token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't redirect on auth check endpoint
    const isAuthMeEndpoint = originalRequest?.url?.includes("/auth/me");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthMeEndpoint
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );

        if (response.data?.data?.accessToken) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch {
        // ✅ FIXED: Removed unused variable 'refreshError'
        // Only clear tokens and redirect for protected routes
        if (!isAuthMeEndpoint) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Don't auto-redirect here - let the component handle it
        }
      }
    }

    // Don't throw error for auth/me endpoint - just return null-like response
    if (isAuthMeEndpoint && error.response?.status === 401) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
