/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { EditIdeaPayload } from "../types/edit-idea.types";

export function useEditIdea(ideaId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditIdeaPayload) => {
      const response = await ideaService.updateIdea(ideaId, payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.myIdeas() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.all });

      toast.success("Idea updated successfully!");
      router.push(`/ideas/${data.id}`);
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update idea";
      toast.error(errorMessage);
    },
  });
}
