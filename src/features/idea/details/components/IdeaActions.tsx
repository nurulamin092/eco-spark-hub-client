"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Idea } from "../../shared/types/idea.types";
import { VoteButtons } from "@/features/vote/components/VoteButtons";
import { BookmarkButton } from "@/features/bookmark/components/BookmarkButton";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

interface IdeaActionsProps {
  idea: Idea;
  onShare: () => void;
}

export function IdeaActions({ idea, onShare }: IdeaActionsProps) {
  const { isAuthenticated } = useAuth();

  const handleShare = useCallback(() => {
    if (!isAuthenticated) {
      toast.error("Please login to share");
      return;
    }
    onShare();
  }, [isAuthenticated, onShare]);

  const isLocked = Boolean(idea.isLocked);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <VoteButtons
        ideaId={idea.id}
        initialUpvotes={idea.upvoteCount}
        initialDownvotes={idea.downvoteCount}
        size="md"
        showLabels
      />

      <BookmarkButton ideaId={idea.id} size="md" showLabel />

      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-1" />
        Share
      </Button>

      {idea.isPaid && !isLocked && (
        <Button variant="secondary" size="sm" disabled>
          <Lock className="h-4 w-4 mr-1" />
          Premium
        </Button>
      )}
    </div>
  );
}
