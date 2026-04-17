"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../shared/services/category.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const response = await categoryService.getAll();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
