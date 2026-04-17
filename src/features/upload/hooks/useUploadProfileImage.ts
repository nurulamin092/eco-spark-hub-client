/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadService } from "../services/upload.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await uploadService.uploadProfileImage(file);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Profile picture updated");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || error.message || "Upload failed",
      );
    },
  });
}
