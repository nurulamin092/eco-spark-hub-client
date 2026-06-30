"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { UserStatus } from "../../types/users.types";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Active",
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  BLOCKED: {
    label: "Blocked",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  DELETED: {
    label: "Deleted",
    className: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  },
};

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
