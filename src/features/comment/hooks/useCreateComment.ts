// ============ src/features/comment/hooks/useCreateComment.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentService } from "../services/comment.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { CreateCommentFormValues } from "../schemas/comment.schema";
import { Comment } from "../types/comment.types";

export function useCreateComment(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentFormValues): Promise<Comment> => {
      return commentService.create(payload);
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
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add comment");
    },
  });
}
