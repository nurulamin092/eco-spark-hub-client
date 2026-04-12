"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function usePayment() {
  return useQuery({
    queryKey: queryKeys.payments.myPayments,
    queryFn: async () => {
      const response = await paymentService.getMyPayments();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}
