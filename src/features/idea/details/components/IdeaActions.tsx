"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Share2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Idea } from "../../shared/types/idea.types";
import { VoteButtons } from "@/features/vote/components/VoteButtons";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

interface IdeaActionsProps {
  idea: Idea;
  onBookmark: () => Promise<void>;
  onShare: () => void;
  isBookmarked?: boolean;
}

export function IdeaActions({
  idea,
  onBookmark,
  onShare,
  isBookmarked = false,
}: IdeaActionsProps) {
  const { isAuthenticated } = useAuth();
  const [isBookmarking, setIsBookmarking] = useState<boolean>(false);

  const handleBookmark = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      toast.error("Please login to bookmark");
      return;
    }

    setIsBookmarking(true);
    try {
      await onBookmark();
    } finally {
      setIsBookmarking(false);
    }
  }, [isAuthenticated, onBookmark]);

  const isLocked: boolean = Boolean(idea.isLocked);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <VoteButtons
        ideaId={idea.id}
        initialUpvotes={idea.upvoteCount}
        initialDownvotes={idea.downvoteCount}
        size="md"
        showLabels
      />

      <Button
        variant="outline"
        size="sm"
        onClick={handleBookmark}
        disabled={isBookmarking || isLocked}
      >
        <Bookmark
          className={`h-4 w-4 mr-1 ${
            isBookmarked ? "fill-primary text-primary" : ""
          }`}
        />
        {isBookmarked ? "Saved" : "Save"}
      </Button>

      <Button variant="outline" size="sm" onClick={onShare}>
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
