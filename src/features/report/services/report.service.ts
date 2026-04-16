import { apiClient } from "@/lib/api/base";
import {
  CreateReportPayload,
  ReportsResponse,
  ReportResponse,
  UpdateReportStatusPayload,
} from "../types/report.types";

export const reportService = {
  create: async (payload: CreateReportPayload): Promise<ReportResponse> => {
    const response = await apiClient.post("/reports", payload);
    return response.data;
  },

  getAll: async (): Promise<ReportsResponse> => {
    const response = await apiClient.get("/reports");
    return response.data;
  },

  updateStatus: async (
    reportId: string,
    payload: UpdateReportStatusPayload,
  ): Promise<ReportResponse> => {
    const response = await apiClient.patch(`/reports/${reportId}`, payload);
    return response.data;
  },
};
