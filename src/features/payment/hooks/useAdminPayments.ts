/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/payment/hooks/useAdminPayments.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentService } from "../services/payment.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface AdminPaymentFilters {
  status?: string;
  page?: number;
  limit?: number;
}

export function useAdminPayments(filters: AdminPaymentFilters = {}) {
  return useQuery({
    queryKey: queryKeys.payments.admin.list(filters),
    queryFn: async () => {
      const response = await paymentService.getAllPaymentsForAdmin(filters);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useApprovePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: string) => {
      const response = await paymentService.approvePayment(paymentId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Payment approved successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.admin.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.myPayments,
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to approve payment");
    },
  });
}

export function useRejectPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      reason,
    }: {
      paymentId: string;
      reason: string;
    }) => {
      const response = await paymentService.rejectPayment(paymentId, reason);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Payment rejected successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.admin.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.myPayments,
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reject payment");
    },
  });
}
