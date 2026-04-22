// ============ src/features/category/shared/hooks/useCategories.ts ============
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoryService } from "../services/category.service";
import type { UpdateCategoryPayload } from "../types/category.types";

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategory(id: string | null) {
  return useQuery({
    queryKey: categoryKeys.detail(id || ""),
    queryFn: async () => {
      if (!id) {
        console.log("🔍 [useCategory] No ID provided");
        return null;
      }
      console.log(`🔍 [useCategory] Fetching category with ID: ${id}`);
      try {
        const data = await categoryService.getById(id);
        console.log(`🔍 [useCategory] Success! Received:`, data);
        return data;
      } catch (error) {
        console.error(`🔍 [useCategory] Error fetching category ${id}:`, error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCategoryPayload;
    }) => {
      console.log("🔧 [useUpdateCategory] Updating category:", { id, payload });
      const result = await categoryService.update(id, payload);
      console.log("🔧 [useUpdateCategory] Update result:", result);
      return result;
    },
    onSuccess: (data, { id }) => {
      console.log(
        "✅ [useUpdateCategory] Update successful, invalidating queries...",
      );
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
      toast.success("Category updated successfully");
    },
    onError: (error: Error) => {
      console.error("❌ [useUpdateCategory] Update failed:", error);
      toast.error(error.message || "Failed to update category");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
}
