/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryClient";
import { CreateIdeaFormValues } from "../schema/create-idea.schema";

export function useCreateIdea() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateIdeaFormValues) => {
      const response = await ideaService.createIdea(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.list(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.myIdeas(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.all,
      });

      toast.success("Idea created successfully!");

      // Redirect to the idea details page
      router.push(`/ideas/${data.id}`);
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create idea";
      toast.error(errorMessage);
    },
  });
}
