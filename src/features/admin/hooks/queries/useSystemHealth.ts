"use client";

import { useQuery } from "@tanstack/react-query";
import { adminStatsService } from "../../services/adminStats.service";
import { ADMIN_QUERY_KEYS } from "../../constants";

export function useSystemHealth() {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEYS.SYSTEM_HEALTH],
    queryFn: async () => {
      const response = await adminStatsService.getDashboard();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data.systemHealth;
    },
    staleTime: 60 * 1000,
  });
}
