"use client";

import { Badge } from "@/components/ui/badge";
import { UserRole } from "../../types/users.types";

interface UserRoleBadgeProps {
  role: UserRole;
}

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  SUPER_ADMIN: {
    label: "Super Admin",
    className: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  ADMIN: {
    label: "Admin",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  MEMBER: {
    label: "Member",
    className: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  },
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const config = roleConfig[role] || {
    label: role,
    className: "bg-muted text-muted-foreground",
  };

  return <Badge className={config.className}>{config.label}</Badge>;
}
