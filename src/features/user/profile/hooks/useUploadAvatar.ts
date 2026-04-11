"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth/shared/services/auth.service";
import { queryKeys } from "@/lib/react-query/queryClient";
import { UploadAvatarResponse } from "@/features/auth/shared/types/auth.types";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation<UploadAvatarResponse, Error, File>({
    mutationFn: async (file) => {
      const response = await authService.uploadAvatar(file);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },

    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.profile,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.auth.me,
        }),
      ]);

      toast.success("Profile picture updated!");
    },

    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";

      toast.error(message);
    },
  });
}
