"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useIdeaForEdit(ideaId: string) {
  return useQuery({
    queryKey: [...queryKeys.ideas.detail(ideaId), "edit"],
    queryFn: async () => {
      const response = await ideaService.getIdeaForEdit(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 0,
    enabled: !!ideaId,
    retry: 1,
  });
}
