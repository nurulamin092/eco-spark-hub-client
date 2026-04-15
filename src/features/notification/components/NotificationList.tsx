"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";

interface NotificationListProps {
  onClose?: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const { data: notifications, isLoading } = useNotifications();
  const { mutateAsync: markAllAsRead, isPending } = useMarkAllAsRead();

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  if (isLoading) {
    return (
      <div className="w-80 max-h-96 overflow-y-auto">
        <div className="p-3 border-b">
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="divide-y">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-3">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-48" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <div className="w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-background">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="font-medium">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={isPending}
            className="h-7 text-xs"
          >
            <CheckCheck className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="divide-y">
        {notifications?.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))
        )}
      </div>
    </div>
  );
}
