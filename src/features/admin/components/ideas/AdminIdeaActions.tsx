// ============ src/features/admin/components/ideas/AdminIdeaActions.tsx ============
"use client";

import { useState } from "react";
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
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useApproveIdea } from "../../hooks/mutations/useApproveIdea";
import { useRejectIdea } from "../../hooks/mutations/useRejectIdea";
import type { Idea } from "@/features/idea/shared/types/idea.types";

interface AdminIdeaActionsProps {
  idea: Idea;
  onSuccess: () => void;
}

export function AdminIdeaActions({ idea, onSuccess }: AdminIdeaActionsProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { mutateAsync: approve, isPending: isApproving } = useApproveIdea();
  const { mutateAsync: reject, isPending: isRejecting } = useRejectIdea();

  const isPending = isApproving || isRejecting;

  const handleApprove = async () => {
    try {
      await approve(idea.id);
      onSuccess();
    } catch {
      // Error handled by mutation
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      toast.error("Please provide feedback");
      return;
    }
    try {
      await reject({ ideaId: idea.id, feedback });
      setShowRejectDialog(false);
      setFeedback("");
      onSuccess();
    } catch {
      // Error handled by mutation
    }
  };

  // Already reviewed ideas
  if (idea.status !== "UNDER_REVIEW") {
    return (
      <div className="border-t pt-6">
        <p className="text-sm text-muted-foreground">
          This idea has been {idea.status.toLowerCase()}.
          {idea.status === "REJECTED" && idea.adminFeedback && (
            <span className="block mt-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-md text-red-600 dark:text-red-400">
              <strong className="font-semibold">Admin Feedback:</strong>{" "}
              {idea.adminFeedback}
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isPending}
        >
          Back
        </Button>
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleApprove}
          disabled={isPending}
        >
          {isApproving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Check className="h-4 w-4 mr-2" />
          )}
          Approve Idea
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowRejectDialog(true)}
          disabled={isPending}
        >
          {isRejecting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <X className="h-4 w-4 mr-2" />
          )}
          Reject Idea
        </Button>
      </div>

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
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
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
