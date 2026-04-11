/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { VerifyOtpFormValues } from "../schemas/forgot-password.schema";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async (values: VerifyOtpFormValues) => {
      const response = await authService.verifyOtp(values.email, values.otp);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Invalid OTP";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
