"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Check, X, Loader2 } from "lucide-react";
import type { PendingIdea } from "@/features/admin/types/admin.types";
import { useApproveIdea } from "@/features/admin/hooks/mutations/useApproveIdea";
import { useRejectIdea } from "@/features/admin/hooks/mutations/useRejectIdea";

interface PendingIdeasRowProps {
  idea: PendingIdea;
  onActionComplete: () => void;
}

export function PendingIdeasRow({
  idea,
  onActionComplete,
}: PendingIdeasRowProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { mutateAsync: approve, isPending: isApproving } = useApproveIdea();
  const { mutateAsync: reject, isPending: isRejecting } = useRejectIdea();

  const handleApprove = async () => {
    try {
      await approve(idea.id);
      onActionComplete();
    } catch (error) {
      // Error is handled by the mutation's onError
      console.error("Approve failed:", error);
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) return;

    try {
      await reject({ ideaId: idea.id, feedback });
      setShowRejectDialog(false);
      setFeedback("");
      onActionComplete();
    } catch (error) {
      console.error("Reject failed:", error);
    }
  };

  const isPending = isApproving || isRejecting;

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{idea.title}</p>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <span>By: {idea.author.name}</span>
            <span>Category: {idea.category.name}</span>
            <span>
              Submitted: {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Link href={`/admin/ideas/${idea.id}`}>
            <Button size="sm" variant="outline" disabled={isPending}>
              <Eye className="h-4 w-4 mr-1" />
              Review
            </Button>
          </Link>

          <Button
            size="sm"
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleApprove}
            disabled={isPending}
          >
            {isApproving ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-1" />
            )}
            Approve
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => setShowRejectDialog(true)}
            disabled={isPending}
          >
            {isRejecting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <X className="h-4 w-4 mr-1" />
            )}
            Reject
          </Button>
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Idea</DialogTitle>
            <DialogDescription>
              Please provide feedback to the author explaining why this idea is
              being rejected. This feedback will be visible to the author.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setFeedback("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!feedback.trim()}
            >
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
