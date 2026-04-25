// ============ src/features/comment/hooks/useComments.ts ============
"use client";

import { useQuery } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import { Comment } from "../types/comment.types";

export const commentKeys = {
  all: ["comments"] as const,
  byIdea: (ideaId: string) => [...commentKeys.all, "byIdea", ideaId] as const,
};

export function useComments(ideaId: string) {
  return useQuery({
    queryKey: commentKeys.byIdea(ideaId),
    queryFn: async (): Promise<Comment[]> => {
      const response = await commentService.getByIdea(ideaId);

      const extractComments = (data: unknown): Comment[] => {
        if (!data) return [];

        // Direct array
        if (Array.isArray(data)) return data;

        // Object with data property
        if (typeof data === "object" && data !== null) {
          const obj = data as { data?: unknown; comments?: unknown };
          if (Array.isArray(obj.data)) return obj.data;
          if (Array.isArray(obj.comments)) return obj.comments;
        }

        return [];
      };

      return extractComments(response);
    },
    enabled: !!ideaId,
    staleTime: 30 * 1000,
  });
}
