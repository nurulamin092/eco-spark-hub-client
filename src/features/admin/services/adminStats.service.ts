import { apiClient } from "@/lib/api/base";
import { DashboardResponse } from "../types/admin.types";

export const adminStatsService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  },
};
