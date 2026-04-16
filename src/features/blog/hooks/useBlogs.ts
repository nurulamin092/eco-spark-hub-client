"use client";

import { useQuery } from "@tanstack/react-query";

import { BlogFilters } from "../types/blog.types";
import { blogService } from "../services/blog.service";

export const BLOGS_QUERY_KEY = ["blogs"] as const;

export function useBlogs(filters: BlogFilters = {}) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, filters],
    queryFn: async () => {
      const response = await blogService.getAll(filters);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 60 * 1000,
  });
}
