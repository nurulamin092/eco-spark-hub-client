"use client";

import { User } from "../../types/users.types";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserActions } from "./UserActions";

interface UsersRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: () => void;
}

export function UsersRow({
  user,
  isSelected,
  onSelect,
  onUpdate,
}: UsersRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors border-b last:border-b-0">
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
          className="rounded border-input"
        />
      </div>
      <div className="col-span-3">
        <p className="font-medium truncate">{user.name}</p>
        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
      </div>
      <div className="col-span-2">
        <UserRoleBadge role={user.role} />
      </div>
      <div className="col-span-2">
        <UserStatusBadge status={user.status} />
      </div>
      <div className="col-span-2 text-sm text-muted-foreground">
        {new Date(user.createdAt).toLocaleDateString()}
      </div>
      <div className="col-span-2 flex justify-end">
        <UserActions user={user} onUpdate={onUpdate} />
      </div>
    </div>
  );
}
