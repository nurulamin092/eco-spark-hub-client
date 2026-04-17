/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useRevokeAllSessions() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await authService.revokeAllSessions();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.sessions });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("All other sessions revoked successfully");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to revoke sessions";
      toast.error(errorMessage);
    },
  });
}
