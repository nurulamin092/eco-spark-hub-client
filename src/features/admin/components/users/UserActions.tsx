"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, UserCheck, UserX } from "lucide-react";
import { User } from "../../types/users.types";
import { useActivateUser } from "../../hooks/mutations/useActivateUser";

import { UserRoleDialog } from "./UserRoleDialog";

import { useDeactivateUser } from "../../hooks/mutations/useDeactivateUser";

interface UserActionsProps {
  user: User;
  onUpdate: () => void;
}

export function UserActions({ user, onUpdate }: UserActionsProps) {
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const { mutateAsync: activate, isPending: isActivating } = useActivateUser();
  const { mutateAsync: deactivate, isPending: isDeactivating } =
    useDeactivateUser();

  const handleActivate = async () => {
    await activate(user.id);
    onUpdate();
  };

  const handleDeactivate = async () => {
    if (confirm(`Are you sure you want to block ${user.name}?`)) {
      await deactivate(user.id);
      onUpdate();
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Role Change Button */}
        <Button
          size="sm"
          variant="outline"
          className="text-purple-600 border-purple-200 hover:bg-purple-50"
          onClick={() => setShowRoleDialog(true)}
          disabled={isActivating || isDeactivating}
        >
          <Shield className="h-3 w-3 mr-1" />
          Role
        </Button>

        {/* Status Change */}
        {user.status === "ACTIVE" ? (
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
              <UserX className="h-3 w-3 mr-1" />
            )}
            Block
          </Button>
        ) : user.status === "BLOCKED" ? (
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
              <UserCheck className="h-3 w-3 mr-1" />
            )}
            Activate
          </Button>
        ) : null}
      </div>

      <UserRoleDialog
        userId={user.id}
        currentRole={user.role}
        userName={user.name}
        isOpen={showRoleDialog}
        onClose={() => setShowRoleDialog(false)}
        onSuccess={onUpdate}
      />
    </>
  );
}
