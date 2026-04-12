/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentService } from "../services/payment.service";

export function useCreateCheckout() {
  return useMutation({
    mutationFn: async (ideaId: string) => {
      const response = await paymentService.createCheckout(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create checkout session";
      toast.error(errorMessage);
    },
  });
}
