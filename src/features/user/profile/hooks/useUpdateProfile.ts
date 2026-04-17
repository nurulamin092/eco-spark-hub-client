/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth/shared/services/auth.service";

import { ProfileFormValues } from "../schema/profile.schema";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const response = await authService.updateProfile(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      // Update user data in cache
      queryClient.setQueryData(queryKeys.user.profile, response.data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
