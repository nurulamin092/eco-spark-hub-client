"use client";

import { useQuery } from "@tanstack/react-query";
import { adminStatsService } from "../../services/adminStats.service";
import { ADMIN_QUERY_KEYS } from "../../constants";

export function useAdminStats() {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEYS.STATS],
    queryFn: async () => {
      const response = await adminStatsService.getDashboard();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
