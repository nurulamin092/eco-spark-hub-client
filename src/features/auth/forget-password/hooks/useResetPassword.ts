/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { ResetPasswordFormValues } from "../schemas/forgot-password.schema";

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ResetPasswordFormValues) => {
      const response = await authService.resetPassword(
        values.email,
        values.otp,
        values.newPassword,
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      toast.success(
        "Password reset successful! Please login with your new password.",
      );
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
