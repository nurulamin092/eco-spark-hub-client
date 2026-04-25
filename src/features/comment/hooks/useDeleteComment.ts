// ============ src/features/comment/hooks/useDeleteComment.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentService } from "../services/comment.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useDeleteComment(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string): Promise<void> => {
      return commentService.delete(commentId);
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
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete comment");
    },
  });
}
