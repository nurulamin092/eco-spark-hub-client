"use client";

import { useQuery } from "@tanstack/react-query";
import { auditService } from "../services/audit.service";
import { AuditFilters } from "../types/audit.types";

export const AUDIT_QUERY_KEY = ["audit-logs"] as const;

export function useAuditLogs(filters: AuditFilters = {}) {
  return useQuery({
    queryKey: [...AUDIT_QUERY_KEY, filters],
    queryFn: async () => {
      const response = await auditService.getLogs(filters);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}