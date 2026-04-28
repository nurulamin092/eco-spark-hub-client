// ============ src/features/comment/hooks/useComments.ts ============
"use client";

import { useQuery } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import type { Comment } from "../types/comment.types";

export const commentKeys = {
  all: ["comments"] as const,
  byIdea: (ideaId: string) => [...commentKeys.all, "byIdea", ideaId] as const,
};

export function useComments(ideaId: string) {
  return useQuery({
    queryKey: commentKeys.byIdea(ideaId),
    queryFn: async (): Promise<Comment[]> => {
      console.log("🔍 [useComments] Fetching comments for idea:", ideaId);
      const comments = await commentService.getByIdea(ideaId);
      console.log("✅ [useComments] Comments received:", comments);
      console.log("📊 [useComments] Comment count:", comments.length);

      // Ensure each comment has required fields for UI
      return comments.map((comment) => ({
        ...comment,
        user: comment.user || {
          id: comment.userId,
          name: "Anonymous",
          image: null,
        },
        replies: comment.replies || [],
      }));
    },
    enabled: !!ideaId,
    staleTime: 30 * 1000,
    retry: 1,
  });
}
