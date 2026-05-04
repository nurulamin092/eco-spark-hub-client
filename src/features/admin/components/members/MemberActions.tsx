"use client";

import { useActivateMember } from "../../hooks/queries/useActivateMember";
import { useDeactivateMember } from "../../hooks/queries/useDeactivateMember";
import { useDeleteMember } from "../../hooks/queries/useDeleteMember";
import { Member } from "../../types/members.types";
import { Button } from "@/components/ui/button";

export function MemberActions({ member }: { member: Member }) {
  const { mutate: activate } = useActivateMember();
  const { mutate: deactivate } = useDeactivateMember();
  const { mutate: deleteMember } = useDeleteMember();

  return (
    <div className="flex gap-2">
      <Button onClick={() => activate(member.id)}>Activate</Button>
      <Button variant="secondary" onClick={() => deactivate(member.id)}>
        Block
      </Button>
      <Button variant="destructive" onClick={() => deleteMember(member.id)}>
        Delete
      </Button>
    </div>
  );
}
