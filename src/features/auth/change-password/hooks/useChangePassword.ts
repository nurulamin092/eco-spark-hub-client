/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { ChangePasswordFormValues } from "../schema/change-password.schema";

export function useChangePassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ChangePasswordFormValues) => {
      const response = await authService.changePassword(
        data.currentPassword,
        data.newPassword,
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      router.push("/member/profile");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
