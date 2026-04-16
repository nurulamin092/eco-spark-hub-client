"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "../services/blog.service";

export const BLOG_DETAILS_QUERY_KEY = ["blog-details"] as const;

export function useBlogDetails(slug: string) {
  return useQuery({
    queryKey: [...BLOG_DETAILS_QUERY_KEY, slug],
    queryFn: async () => {
      const response = await blogService.getBySlug(slug);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 60 * 1000,
  });
}