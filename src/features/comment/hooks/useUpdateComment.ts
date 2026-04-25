// ============ src/features/comment/hooks/useUpdateComment.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentService } from "../services/comment.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { UpdateCommentFormValues } from "../schemas/comment.schema";
import { Comment } from "../types/comment.types";

export function useUpdateComment(ideaId: string, commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCommentFormValues): Promise<Comment> => {
      return commentService.update(commentId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byIdea(ideaId),
      });
      toast.success("Comment updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update comment");
    },
  });
}
