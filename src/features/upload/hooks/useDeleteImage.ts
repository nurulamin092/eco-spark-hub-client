/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadService } from "../services/upload.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useDeleteImage(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ publicId }: { publicId: string }) => {
      const response = await uploadService.deleteIdeaImage(ideaId, publicId);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      toast.success("Image deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || error.message || "Delete failed",
      );
    },
  });
}
