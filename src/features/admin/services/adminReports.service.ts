import { apiClient } from "@/lib/api/base";
import { ApiResponse } from "../types/api.types";

export const adminReportsService = {
  updateReportStatus: async (
    reportId: string,
    status: string,
    notes?: string,
  ): Promise<ApiResponse> => {
    const response = await apiClient.patch(`/reports/${reportId}`, {
      status,
      notes,
    });
    return response.data;
  },
};
