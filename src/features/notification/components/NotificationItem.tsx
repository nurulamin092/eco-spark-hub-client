"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  CheckCircle,
  ThumbsUp,
  MessageCircle,
  DollarSign,
  Flag,
  Mail,
} from "lucide-react";
import { Notification, NotificationType } from "../types/notification.types";
import { useMarkAsRead } from "../hooks/useMarkAsRead";

interface NotificationItemProps {
  notification: Notification;
  onRead?: () => void;
  onClose?: () => void; 
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  IDEA_APPROVED: <CheckCircle className="h-4 w-4 text-green-500" />,
  IDEA_REJECTED: <CheckCircle className="h-4 w-4 text-red-500" />,
  COMMENT_REPLY: <MessageCircle className="h-4 w-4 text-blue-500" />,
  VOTE_RECEIVED: <ThumbsUp className="h-4 w-4 text-yellow-500" />,
  PAYMENT_SUCCESS: <DollarSign className="h-4 w-4 text-green-500" />,
  IDEA_REPORTED: <Flag className="h-4 w-4 text-red-500" />,
  NEWSLETTER: <Mail className="h-4 w-4 text-primary" />,
};

export function NotificationItem({
  notification,
  onRead,
  onClose,
}: NotificationItemProps) {
  const { mutateAsync: markAsRead } = useMarkAsRead();

  const handleClick = async () => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
      onRead?.();
    }
    onClose?.();
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
        !notification.isRead ? "bg-primary/5" : ""
      }`}
      onClick={handleClick}
    >
      <div className="shrink-0 mt-0.5">
        {iconMap[notification.type] || (
          <Bell className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
      )}
    </div>
  );
}
