"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryClient";
import { MyIdeasFilters } from "../types/my-ideas.types";

export function useMyIdeas(filters: MyIdeasFilters = {}) {
  return useQuery({
    queryKey: queryKeys.ideas.myIdeas(filters),
    queryFn: async () => {
      const response = await ideaService.getMyIdeas(filters);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
    retry: 1,
  });
}
