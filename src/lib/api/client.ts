import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { env } from "../config/env";
import { refreshAccessToken } from "./token-refresh";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    const isAuthEndpoint = originalRequest.url?.includes("/auth/");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        return apiClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
