/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentService } from "../services/comment.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useDeleteComment(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const response = await commentService.delete(commentId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byIdea(ideaId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      toast.success("Comment deleted");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete comment";
      toast.error(errorMessage);
    },
  });
}
