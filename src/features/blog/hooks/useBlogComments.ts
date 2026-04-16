"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "../services/blog.service";

export const BLOG_COMMENTS_QUERY_KEY = ["blog-comments"] as const;

export function useBlogComments(
  blogId: string,
  page: number = 1,
  limit: number = 20,
) {
  return useQuery({
    queryKey: [...BLOG_COMMENTS_QUERY_KEY, blogId, page, limit],
    queryFn: async () => {
      const response = await blogService.getComments(blogId, page, limit);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    enabled: !!blogId,
    staleTime: 30 * 1000,
  });
}
