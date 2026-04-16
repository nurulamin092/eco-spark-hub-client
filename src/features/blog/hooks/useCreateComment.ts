/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogService } from "../services/blog.service";
import { BLOG_COMMENTS_QUERY_KEY } from "./useBlogComments";

interface CreateCommentPayload {
  content: string;
  blogId: string;
  parentId?: string;
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCommentPayload) => {
      const response = await blogService.createComment(payload);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_COMMENTS_QUERY_KEY });
      toast.success("Comment added successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add comment",
      );
    },
  });
}
