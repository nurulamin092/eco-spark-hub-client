"use client";

import { useQuery } from "@tanstack/react-query";
import { authService } from "../../shared/services/auth.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useSessions() {
  return useQuery({
    queryKey: queryKeys.auth.sessions,
    queryFn: async () => {
      const response = await authService.getSessions();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}
