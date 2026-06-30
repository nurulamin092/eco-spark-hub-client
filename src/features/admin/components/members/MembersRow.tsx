"use client";

import { Member } from "../../types/members.types";
import { MemberActions } from "./MemberActions";
import { MemberStatusBadge } from "./MemberStatusBadge";

interface MembersRowProps {
  member: Member;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: () => void;
}

export function MembersRow({
  member,
  isSelected,
  onSelect,
  onUpdate,
}: MembersRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors border-b last:border-b-0">
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(member.id)}
          className="rounded border-input"
        />
      </div>
      <div className="col-span-4 flex flex-col gap-1 min-w-0">
        <p className="font-medium truncate">{member.name}</p>
        <p className="text-sm text-muted-foreground truncate">
          {member.user.email}
        </p>
      </div>
      <div className="col-span-3">
        <MemberStatusBadge status={member.user.status} />
      </div>
      <div className="col-span-2 text-sm text-muted-foreground">
        {new Date(member.createdAt).toLocaleDateString()}
      </div>
      <div className="col-span-2 flex justify-end">
        <MemberActions member={member} onUpdate={onUpdate} />
      </div>
    </div>
  );
}
