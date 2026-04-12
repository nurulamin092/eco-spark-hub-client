/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../../shared/services/auth.service";
import { useAuth } from "../../shared/hooks/useAuth";

export function useDeleteAccount() {
  const router = useRouter();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async (password: string) => {
      const response = await authService.deleteAccount(password);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: async () => {
      toast.success("Account deleted successfully");
      await logout();
      router.push("/");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete account";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
