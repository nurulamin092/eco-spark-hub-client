// ============ src/features/category/delete/components/DeleteCategoryDialog.tsx ============
"use client";

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

import { Loader2 } from "lucide-react";
import { useDeleteCategory } from "../../shared/hooks/useCategories";

interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  categoryName: string;
  onDeleted?: () => void;
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  categoryId,
  categoryName,
  onDeleted,
}: DeleteCategoryDialogProps) {
  const { mutateAsync, isPending } = useDeleteCategory();

  const handleDelete = async () => {
    await mutateAsync(categoryId);
    onOpenChange(false);
    onDeleted?.();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will deactivate the category &quot;{categoryName}&quot;. Ideas
            in this category will still exist but won&quot;t be visible in the
            category list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
