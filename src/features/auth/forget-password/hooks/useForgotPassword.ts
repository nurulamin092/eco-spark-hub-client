/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { ForgotPasswordFormValues } from "../schemas/forgot-password.schema";

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (values: ForgotPasswordFormValues) => {
      const response = await authService.forgotPassword(values.email);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (_, variables) => {
      toast.success(`OTP sent to ${variables.email}`);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to send OTP";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
