"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useIdeaDetails(ideaId: string) {
  return useQuery({
    queryKey: queryKeys.ideas.detail(ideaId),
    queryFn: async () => {
      const response = await ideaService.getIdeaById(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 60 * 1000,
    retry: 1,
    enabled: !!ideaId,
  });
}
