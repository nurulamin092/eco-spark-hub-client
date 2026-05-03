// ============ src/features/idea/my-ideas/hooks/useMyIdeas.ts ============
"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "../../shared/services/idea.service";
import type { MyIdeasFilters, MyIdeasResponse } from "../types/my-ideas.types";

export const myIdeasQueryKeys = {
  all: ["my-ideas"] as const,
  list: (filters?: MyIdeasFilters) =>
    [...myIdeasQueryKeys.all, "list", filters] as const,
};

export function useMyIdeas(filters: MyIdeasFilters = {}) {
  return useQuery({
    queryKey: myIdeasQueryKeys.list(filters),
    queryFn: async (): Promise<MyIdeasResponse["data"]> => {
      const response = await ideaService.getMyIdeas(filters);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData,
    retry: 1,
  });
}
