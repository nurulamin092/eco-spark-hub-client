/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { newsletterService } from "../services/newsletter.service";

export function useUnsubscribeNewsletter() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await newsletterService.unsubscribe(email);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (data) => {
      toast.success(
        data.message || "Successfully unsubscribed from newsletter",
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to unsubscribe";
      toast.error(errorMessage);
    },
  });
}
