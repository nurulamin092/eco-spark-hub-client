/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { ResendOtpFormValues } from "../schema/verify-email.schema";

export function useResendOtp() {
  return useMutation({
    mutationFn: async (data: ResendOtpFormValues) => {
      const response = await authService.resendOtp(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      toast.success("OTP resent successfully! Please check your email.");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
