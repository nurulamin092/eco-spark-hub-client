"use client";

import { useQuery } from "@tanstack/react-query";
import { bookmarkService } from "../services/bookmark.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useIsBookmarked(ideaId: string) {
  return useQuery({
    queryKey: queryKeys.bookmarks.check(ideaId),
    queryFn: async () => {
      const isBookmarked = await bookmarkService.isBookmarked(ideaId);
      return isBookmarked;
    },
    enabled: !!ideaId,
    staleTime: 30 * 1000,
  });
}
