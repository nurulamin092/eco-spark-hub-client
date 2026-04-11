/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";

import { VerifyEmailFormValues } from "../schema/verify-email.schema";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useVerifyEmail() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyEmailFormValues) => {
      const response = await authService.verifyEmail(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Email verified successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
