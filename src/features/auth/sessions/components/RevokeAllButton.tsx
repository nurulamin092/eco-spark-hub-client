"use client";

import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRevokeAllSessions } from "../hooks/useRevokeAllSessions";

export function RevokeAllButton() {
  const { mutateAsync, isPending } = useRevokeAllSessions();

  const handleRevokeAll = async () => {
    if (confirm("This will log you out from all other devices. Continue?")) {
      await mutateAsync();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRevokeAll}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Revoke All Other Sessions
    </Button>
  );
}
