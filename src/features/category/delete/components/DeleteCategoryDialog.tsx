"use client";

import { useCallback } from "react";
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
import { useDeleteCategory } from "../hooks/useDeleteCategory";

interface DeleteCategoryDialogProps {
  categoryId: string | null;
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteCategoryDialog({
  categoryId,
  categoryName,
  isOpen,
  onClose,
  onSuccess,
}: DeleteCategoryDialogProps) {
  const { mutateAsync, isPending } = useDeleteCategory();

  const handleDelete = useCallback(async () => {
    if (!categoryId) return;
    await mutateAsync(categoryId);
    onClose();
    onSuccess?.();
  }, [categoryId, mutateAsync, onClose, onSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Delete Category</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete &quot;{categoryName}&quot;? This
            action cannot be undone. Ideas in this category will remain but
            become uncategorized.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Category"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
