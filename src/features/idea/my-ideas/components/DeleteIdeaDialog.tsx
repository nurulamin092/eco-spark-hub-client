"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useDeleteIdea } from "../hooks/useDeleteIdea";

interface DeleteIdeaDialogProps {
  ideaId: string | null;
  ideaTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteIdeaDialog({
  ideaId,
  ideaTitle,
  isOpen,
  onClose,
}: DeleteIdeaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useDeleteIdea();

  const handleDelete = useCallback(async () => {
    if (!ideaId) return;

    setIsLoading(true);
    try {
      await mutateAsync(ideaId);
      onClose();
    } finally {
      setIsLoading(false);
    }
  }, [ideaId, mutateAsync, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Delete Idea</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete `&quot;{ideaTitle}`&quot;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
