"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "../../shared/services/idea.service";

export function useRelatedIdeas(ideaId: string, limit: number = 3) {
  return useQuery({
    queryKey: ["ideas", "related", ideaId, limit],
    queryFn: async () => {
      const response = await ideaService.getRelatedIdeas(ideaId, limit);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!ideaId,
  });
}
