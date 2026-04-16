import { apiClient } from "@/lib/api/base";
import { AuditLogsResponse, AuditFilters } from "../types/audit.types";

export const auditService = {
  getLogs: async (filters?: AuditFilters): Promise<AuditLogsResponse> => {
    const response = await apiClient.get("/audit-logs", { params: filters });
    return response.data;
  },
};
