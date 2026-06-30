"use client";

import { useActivateMember } from "../../hooks/queries/useActivateMember";
import { useDeactivateMember } from "../../hooks/queries/useDeactivateMember";
import { useDeleteMember } from "../../hooks/queries/useDeleteMember";
import { Member } from "../../types/members.types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MemberActionsProps {
  member: Member;
  onUpdate: () => void;
}

export function MemberActions({ member, onUpdate }: MemberActionsProps) {
  const { mutateAsync: activate, isPending: isActivating } =
    useActivateMember();
  const { mutateAsync: deactivate, isPending: isDeactivating } =
    useDeactivateMember();
  const { mutateAsync: deleteMember, isPending: isDeleting } =
    useDeleteMember();

  const handleActivate = async () => {
    try {
      await activate(member.id);
      onUpdate();
    } catch {
      toast.error("Failed to activate member");
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivate(member.id);
      onUpdate();
    } catch {
      toast.error("Failed to deactivate member");
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${member.name}?`)) {
      try {
        await deleteMember(member.id);
        onUpdate();
      } catch {
        toast.error("Failed to delete member");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="text-green-600 border-green-200 hover:bg-green-50"
        onClick={handleActivate}
        disabled={isActivating}
      >
        {isActivating ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          "Activate"
        )}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
        onClick={handleDeactivate}
        disabled={isDeactivating}
      >
        {isDeactivating ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          "Block"
        )}
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Delete"}
      </Button>
    </div>
  );
}
