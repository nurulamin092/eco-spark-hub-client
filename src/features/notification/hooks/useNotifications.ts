"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../services/notification.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: async () => {
      const response = await notificationService.getMyNotifications();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
    refetchInterval: 60000,
  });
}
