"use client";

import { useQuery } from "@tanstack/react-query";
import { adminStatsService } from "../../services/adminStats.service";
import { ADMIN_QUERY_KEYS } from "../../constants";

export function useTopIdeas() {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEYS.TOP_IDEAS],
    queryFn: async () => {
      const response = await adminStatsService.getDashboard();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data.topIdeas;
    },
    staleTime: 5 * 60 * 1000,
  });
}
