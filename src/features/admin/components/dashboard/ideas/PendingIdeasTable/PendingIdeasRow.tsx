"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Check, X } from "lucide-react";
import { PendingIdea } from "@/features/admin/types/admin.types";
import {
  useApproveIdea,
  useRejectIdea,
} from "@/features/admin/hooks/mutations";

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
    await approve(idea.id);
    onActionComplete();
  };

  const handleReject = async () => {
    if (!feedback.trim()) return;
    await reject({ ideaId: idea.id, feedback });
    setShowRejectDialog(false);
    setFeedback("");
    onActionComplete();
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{idea.title}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>By: {idea.author.name}</span>
            <span>Category: {idea.category.name}</span>
            <span>
              Submitted: {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/ideas/${idea.id}`}>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              Review
            </Button>
          </Link>
          <Button
            size="sm"
            variant="default"
            onClick={handleApprove}
            disabled={isApproving}
          >
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setShowRejectDialog(true)}
            disabled={isRejecting}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      </div>

      {/* Reject Dialog - Simplified */}
      {showRejectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Reject Idea</h3>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              rows={4}
              placeholder="Provide feedback for the author..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end gap-2">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
