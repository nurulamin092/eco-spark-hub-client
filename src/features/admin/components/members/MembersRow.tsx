"use client";

import { Member } from "../../types/members.types";
import { MemberActions } from "./MemberActions";
import { MemberStatusBadge } from "./MemberStatusBadge";

export function MembersRow({ member }: { member: Member }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-medium truncate">{member.name}</p>

        <p className="text-sm text-muted-foreground truncate">
          {member.user.email}
        </p>

        <MemberStatusBadge status={member.user.status} />
      </div>

      <div className="flex items-center gap-2">
        <MemberActions member={member} />
      </div>
    </div>
  );
}
