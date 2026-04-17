/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { categoryService } from "../../shared/services/category.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { EditCategoryFormValues } from "../schema/edit-category.schema";

export function useEditCategory(categoryId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditCategoryFormValues) => {
      const response = await categoryService.update(categoryId, payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category updated successfully");
      router.push("/admin/categories");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update category";
      toast.error(errorMessage);
    },
  });
}
