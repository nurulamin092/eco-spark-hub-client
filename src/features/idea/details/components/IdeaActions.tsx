"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Bookmark, Share2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Idea } from "../../shared/types/idea.types";

interface IdeaActionsProps {
  idea: Idea;
  onVote: (type: "UP" | "DOWN") => Promise<void>;
  onBookmark: () => Promise<void>;
  onShare: () => void;
  userVote?: "UP" | "DOWN" | null;
  isBookmarked?: boolean;
}

export function IdeaActions({
  idea,
  onVote,
  onBookmark,
  onShare,
  userVote,
  isBookmarked,
}: IdeaActionsProps) {
  const { isAuthenticated } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleVote = useCallback(
    async (type: "UP" | "DOWN") => {
      if (!isAuthenticated) {
        toast.error("Please login to vote");
        return;
      }

      if (idea.isLocked) {
        toast.error("Purchase this idea to vote");
        return;
      }

      setIsVoting(true);
      try {
        await onVote(type);
      } finally {
        setIsVoting(false);
      }
    },
    [isAuthenticated, idea.isLocked, onVote],
  );

  const handleBookmark = useCallback(async () => {
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

  return (
    <div className="flex flex-wrap gap-2">
      {/* Vote Buttons */}
      <div className="flex items-center border rounded-md overflow-hidden">
        <Button
          variant={userVote === "UP" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleVote("UP")}
          disabled={isVoting || idea.isLocked}
          className="rounded-none"
        >
          <ArrowUp className="h-4 w-4 mr-1" />
          Upvote
        </Button>
        <div className="w-px h-6 bg-border" />
        <Button
          variant={userVote === "DOWN" ? "destructive" : "ghost"}
          size="sm"
          onClick={() => handleVote("DOWN")}
          disabled={isVoting || idea.isLocked}
          className="rounded-none"
        >
          <ArrowDown className="h-4 w-4 mr-1" />
          Downvote
        </Button>
      </div>

      {/* Bookmark Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleBookmark}
        disabled={isBookmarking || idea.isLocked}
      >
        <Bookmark
          className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-primary text-primary" : ""}`}
        />
        {isBookmarked ? "Saved" : "Save"}
      </Button>

      {/* Share Button */}
      <Button variant="outline" size="sm" onClick={onShare}>
        <Share2 className="h-4 w-4 mr-1" />
        Share
      </Button>

      {/* Locked Indicator for Paid Ideas */}
      {idea.isPaid && !idea.isLocked && (
        <Button variant="secondary" size="sm" disabled>
          <Lock className="h-4 w-4 mr-1" />
          Premium
        </Button>
      )}
    </div>
  );
}
