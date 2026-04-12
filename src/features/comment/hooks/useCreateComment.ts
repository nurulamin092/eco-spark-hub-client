/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentService } from "../services/comment.service";
import { queryKeys } from "@/lib/react-query/queryClient";
import { CreateCommentFormValues } from "../schemas/comment.schema";

export function useCreateComment(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCommentFormValues) => {
      const response = await commentService.create(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byIdea(ideaId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      toast.success("Comment added");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add comment";
      toast.error(errorMessage);
    },
  });
}
