/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { blogService } from "../services/blog.service";
import { BLOGS_QUERY_KEY } from "./useBlogs";
import { CreateBlogFormValues } from "../schemas/blog.schema";

export function useCreateBlog() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBlogFormValues) => {
      const response = await blogService.create(data);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      toast.success("Blog created successfully!");
      router.push(`/blog/${data.slug}`);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create blog",
      );
    },
  });
}
