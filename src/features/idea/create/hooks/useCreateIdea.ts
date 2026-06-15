/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreateIdea() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log(" [DEBUG] Creating idea with data:", data);

      //  Ensure price is only sent for paid ideas
      let formattedData: any = {
        title: data.title,
        problem: data.problem,
        solution: data.solution,
        description: data.description,
        categoryId: data.categoryId,
        isPaid: data.isPaid,
      };

      //  Only include price if it's a paid idea
      if (data.isPaid === true && data.price) {
        formattedData.price = Number(data.price);
      }

      //  Include images if any
      if (data.images && data.images.length > 0) {
        formattedData.images = data.images;
      }

      console.log(" [DEBUG] Formatted data for API:", formattedData);

      const response = await ideaService.createIdea(formattedData);

      if (!response.success) {
        throw new Error(response.message || "Failed to create idea");
      }

      return response.data;
    },
    onSuccess: (data) => {
      console.log(" [DEBUG] Idea created successfully:", data);

      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.myIdeas() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.all });

      toast.success("Idea created successfully! It will be reviewed by admin.");

      router.push("/member/ideas");
      router.refresh();
    },
    onError: (error: any) => {
      console.error(" [DEBUG] Create idea error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create idea. Please try again.";

      toast.error(errorMessage);
    },
  });
}
