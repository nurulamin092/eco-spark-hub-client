"use client";

import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useVote } from "../hooks/useVote";
import { useUserVote } from "../hooks/useUserVote";
import { VoteType } from "../types/vote.types";
import { toast } from "sonner";

interface VoteButtonsProps {
  ideaId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  onVoteChange?: (upvotes: number, downvotes: number) => void;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const sizeClasses = {
  sm: { button: "h-7 w-7", icon: "h-3 w-3", text: "text-xs" },
  md: { button: "h-9 w-9", icon: "h-4 w-4", text: "text-sm" },
  lg: { button: "h-11 w-11", icon: "h-5 w-5", text: "text-base" },
};

export function VoteButtons({
  ideaId,
  initialUpvotes = 0,
  initialDownvotes = 0,

  size = "md",
  showLabels = true,
}: VoteButtonsProps) {
  const { isAuthenticated } = useAuth();
  const { userVote, isLoading: isLoadingUserVote } = useUserVote(ideaId);
  const { vote, removeVote, isVoting } = useVote(ideaId);

  const handleVote = useCallback(
    async (type: VoteType) => {
      if (!isAuthenticated) {
        toast.error("Please login to vote");
        return;
      }

      if (userVote === type) {
        await removeVote();
      } else {
        await vote(type);
      }
    },
    [isAuthenticated, userVote, vote, removeVote],
  );

  const isLoading = isLoadingUserVote || isVoting;
  const netVotes = initialUpvotes - initialDownvotes;

  const voteCounts = useMemo(() => {
    return {
      upvotes: initialUpvotes,
      downvotes: initialDownvotes,
      net: netVotes,
    };
  }, [initialUpvotes, initialDownvotes, netVotes]);

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={userVote === "UP" ? "default" : "ghost"}
        size="icon"
        className={sizeClasses[size].button}
        onClick={() => handleVote("UP")}
        disabled={isLoading}
        aria-label="Upvote"
      >
        {isLoading ? (
          <Loader2 className={`${sizeClasses[size].icon} animate-spin`} />
        ) : (
          <ArrowUp className={sizeClasses[size].icon} />
        )}
      </Button>

      {showLabels && (
        <span
          className={`font-medium min-w-8 text-center ${sizeClasses[size].text}`}
        >
          {voteCounts.upvotes}
        </span>
      )}

      <Button
        variant={userVote === "DOWN" ? "destructive" : "ghost"}
        size="icon"
        className={sizeClasses[size].button}
        onClick={() => handleVote("DOWN")}
        disabled={isLoading}
        aria-label="Downvote"
      >
        {isLoading ? (
          <Loader2 className={`${sizeClasses[size].icon} animate-spin`} />
        ) : (
          <ArrowDown className={sizeClasses[size].icon} />
        )}
      </Button>

      {showLabels && (
        <span
          className={`font-medium min-w-8 text-center ${sizeClasses[size].text}`}
        >
          {voteCounts.downvotes}
        </span>
      )}
    </div>
  );
}
