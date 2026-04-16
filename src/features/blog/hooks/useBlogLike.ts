/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogService } from "../services/blog.service";
import { BLOG_DETAILS_QUERY_KEY } from "./useBlogDetails";

interface LikeResponse {
  liked: boolean;
  message: string;
}

export function useBlogLike(blogId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await blogService.toggleLike(blogId);
      if (!response.success) throw new Error(response.message);
      return response.data as LikeResponse;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: BLOG_DETAILS_QUERY_KEY });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || error.message || "Failed to like blog",
      );
    },
  });
}
