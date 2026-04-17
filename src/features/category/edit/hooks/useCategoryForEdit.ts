"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../shared/services/category.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCategoryForEdit(categoryId: string) {
  return useQuery({
    queryKey: [...queryKeys.categories.all, categoryId, "edit"],
    queryFn: async () => {
      const response = await categoryService.getById(categoryId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 0,
    enabled: !!categoryId,
    retry: 1,
  });
}
