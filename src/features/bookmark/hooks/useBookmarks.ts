"use client";

import { useQuery } from "@tanstack/react-query";
import { bookmarkService } from "../services/bookmark.service";
import { queryKeys } from "@/lib/react-query/queryClient";

interface UseBookmarksOptions {
  page?: number;
  limit?: number;
}

export function useBookmarks(options: UseBookmarksOptions = {}) {
  const { page = 1, limit = 10 } = options;

  return useQuery({
    queryKey: queryKeys.bookmarks.list(page, limit),
    queryFn: async () => {
      const response = await bookmarkService.getMyBookmarks({ page, limit });
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}
