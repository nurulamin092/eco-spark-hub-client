import { apiClient } from "@/lib/api/base";

export const adminExportService = {
  exportUsers: async (
    format: "csv" | "json" = "csv",
    startDate?: string,
    endDate?: string,
  ): Promise<Blob> => {
    const response = await apiClient.get("/admin/export/users", {
      params: { format, startDate, endDate },
      responseType: "blob",
    });
    return response.data;
  },

  exportIdeas: async (
    format: "csv" | "json" = "csv",
    startDate?: string,
    endDate?: string,
  ): Promise<Blob> => {
    const response = await apiClient.get("/admin/export/ideas", {
      params: { format, startDate, endDate },
      responseType: "blob",
    });
    return response.data;
  },
};
