"use client";

import { useUnreadCount } from "../hooks/useUnreadCount";

interface NotificationBadgeProps {
  className?: string;
}

export function NotificationBadge({ className = "" }: NotificationBadgeProps) {
  const { unreadCount, isLoading } = useUnreadCount();

  if (isLoading || unreadCount === 0) return null;

  return (
    <span
      className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white ${className}`}
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  );
}
