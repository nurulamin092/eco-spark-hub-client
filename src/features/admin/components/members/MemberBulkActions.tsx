"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserCheck, UserX, Users } from "lucide-react";
import { toast } from "sonner";
import { useBulkActivateMembers } from "../../hooks/mutations/useBulkActivateMembers";
import { useBulkDeactivateMembers } from "../../hooks/mutations/useBulkDeactivateMembers";

interface MemberBulkActionsProps {
  selectedIds: string[];
  onSuccess: () => void;
}

export function MemberBulkActions({
  selectedIds,
  onSuccess,
}: MemberBulkActionsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState<
    "activate" | "deactivate" | null
  >(null);

  const { mutateAsync: activate, isPending: isActivating } =
    useBulkActivateMembers();
  const { mutateAsync: deactivate, isPending: isDeactivating } =
    useBulkDeactivateMembers();

  const handleActivate = async () => {
    await activate(selectedIds);
    setShowConfirmDialog(null);
    toast.success(`${selectedIds.length} members activated`);
    onSuccess();
  };

  const handleDeactivate = async () => {
    await deactivate(selectedIds);
    setShowConfirmDialog(null);
    toast.success(`${selectedIds.length} members deactivated`);
    onSuccess();
  };

  const isPending = isActivating || isDeactivating;

  return (
    <>
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
        <Users className="h-5 w-5 text-muted-foreground" />
        <Badge variant="secondary">{selectedIds.length} selected</Badge>
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirmDialog("activate")}
          disabled={isPending}
          className="text-green-600"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Activate All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirmDialog("deactivate")}
          disabled={isPending}
          className="text-yellow-600"
        >
          <UserX className="h-4 w-4 mr-2" />
          Deactivate All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSuccess}
          disabled={isPending}
        >
          Clear Selection
        </Button>
      </div>

      <AlertDialog
        open={!!showConfirmDialog}
        onOpenChange={() => setShowConfirmDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showConfirmDialog === "activate" ? "Activate" : "Deactivate"}{" "}
              {selectedIds.length} Members
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showConfirmDialog === "activate"
                ? `This will activate ${selectedIds.length} selected members.`
                : `This will block ${selectedIds.length} selected members.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                showConfirmDialog === "activate"
                  ? handleActivate
                  : handleDeactivate
              }
              disabled={isPending}
              className={
                showConfirmDialog === "activate"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }
            >
              {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
