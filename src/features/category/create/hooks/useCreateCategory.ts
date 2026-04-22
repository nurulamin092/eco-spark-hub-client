// ============ src/features/category/create/hooks/useCreateCategory.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoryService } from "../../shared/services/category.service";
import type { CreateCategoryPayload } from "../../shared/types/category.types";

const CATEGORY_QUERY_KEYS = {
  all: ["categories"] as const,
  lists: () => [...CATEGORY_QUERY_KEYS.all, "list"] as const,
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const response = await categoryService.create(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.lists() });
      toast.success("Category created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
}
