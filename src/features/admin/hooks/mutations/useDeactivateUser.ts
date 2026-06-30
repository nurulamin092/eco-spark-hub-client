/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "../../services/user.service";
import { USER_QUERY_KEYS } from "../../constants/user.query-keys";

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userService.deactivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      toast.success("User deactivated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Deactivate failed");
    },
  });
}
