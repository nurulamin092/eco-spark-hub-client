"use client";

import { useMemo } from "react";
import { useNotifications } from "./useNotifications";

export function useUnreadCount() {
  const { data: notifications, isLoading } = useNotifications();

  const unreadCount = useMemo(() => {
    if (!notifications) return 0;
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return { unreadCount, isLoading };
}
