"use client";

import { useQuery } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useComments(ideaId: string) {
  return useQuery({
    queryKey: queryKeys.comments.byIdea(ideaId),
    queryFn: async () => {
      const response = await commentService.getByIdea(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: !!ideaId,
    staleTime: 30 * 1000,
  });
}
