import axios from "axios";
import { env } from "../config/env";

export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor - add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle 401 and 429
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthMeEndpoint = originalRequest?.url?.includes("/auth/me");

    // Handle 429 Rate Limit
    if (error.response?.status === 429) {
      const retryAfter = error.response?.headers?.["retry-after"] || 2;
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return apiClient(originalRequest);
      }
      throw new Error("Too many requests. Please try again later.");
    }

    // Handle 401 Unauthorized
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    if (isAuthMeEndpoint && error.response?.status === 401) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
