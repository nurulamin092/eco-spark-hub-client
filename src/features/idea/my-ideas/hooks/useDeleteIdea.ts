/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useDeleteIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ideaId: string) => {
      const response = await ideaService.deleteIdea(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.myIdeas() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() });

      toast.success("Idea deleted successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete idea";
      toast.error(errorMessage);
    },
  });
}
