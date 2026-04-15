/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationService } from "../services/notification.service";
import { queryKeys } from "@/lib/react-query/queryClient";

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await notificationService.markAllAsRead();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      toast.success(data.message || "All notifications marked as read");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to mark all as read";
      toast.error(errorMessage);
    },
  });
}
