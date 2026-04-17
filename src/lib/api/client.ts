import { apiClient } from "./base";
import { API_ENDPOINTS } from "./endpoints";

export const api = {
  get: <T>(url: string, params?: Record<string, unknown>) =>
    apiClient.get<T>(url, { params }),
  post: <T>(url: string, data?: unknown) => apiClient.post<T>(url, data),
  put: <T>(url: string, data?: unknown) => apiClient.put<T>(url, data),
  patch: <T>(url: string, data?: unknown) => apiClient.patch<T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T>(url),
  upload: <T>(url: string, formData: FormData) =>
    apiClient.post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export { API_ENDPOINTS };
