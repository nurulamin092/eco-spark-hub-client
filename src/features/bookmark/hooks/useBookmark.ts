/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookmarkService } from "../services/bookmark.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useBookmark(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await bookmarkService.toggle(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookmarks.check(ideaId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });

      toast.success(
        data.bookmarked ? "Added to bookmarks" : "Removed from bookmarks",
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update bookmark";
      toast.error(errorMessage);
    },
  });
}
