/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadService } from "../services/upload.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useUploadImages(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: File[]) => {
      const response = await uploadService.uploadIdeaImages(ideaId, files);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      toast.success("Images uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || error.message || "Upload failed",
      );
    },
  });
}
