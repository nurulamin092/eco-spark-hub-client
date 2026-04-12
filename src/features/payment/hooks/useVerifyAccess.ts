"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useVerifyAccess(ideaId: string) {
  return useQuery({
    queryKey: queryKeys.payments.verifyAccess(ideaId),
    queryFn: async () => {
      const response = await paymentService.verifyAccess(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data.hasAccess;
    },
    enabled: !!ideaId,
    staleTime: 5 * 60 * 1000,
  });
}
