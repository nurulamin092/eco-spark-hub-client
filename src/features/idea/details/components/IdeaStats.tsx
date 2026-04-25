// ============ src/features/idea/details/components/IdeaStats.tsx ============
"use client";

import {
  Eye,
  MessageCircle,
  Bookmark,
  Share2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Idea } from "../../shared/types/idea.types";

interface IdeaStatsProps {
  idea: Idea;
}

function formatNumber(num: number | undefined | null): string {
  // Handle undefined, null, or NaN
  if (num === undefined || num === null || isNaN(num)) {
    return "0";
  }

  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function IdeaStats({ idea }: IdeaStatsProps) {
  // ✅ Safe access with fallback values
  const upvoteCount = idea.upvoteCount ?? 0;
  const downvoteCount = idea.downvoteCount ?? 0;
  const netVotes = upvoteCount - downvoteCount;
  const viewCount = idea.viewCount ?? 0;
  const commentCount = idea.commentCount ?? 0;
  const bookmarkCount = idea.bookmarkCount ?? 0;
  const shareCount = idea.shareCount ?? 0;

  return (
    <div className="flex flex-wrap gap-6 py-4 border-y">
      {/* Votes */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="font-medium">{formatNumber(upvoteCount)}</span>
        </div>
        <div className="flex items-center gap-1">
          <ArrowDown className="h-4 w-4 text-red-500" />
          <span className="font-medium">{formatNumber(downvoteCount)}</span>
        </div>
        <span className="text-sm text-muted-foreground ml-1">
          net: {formatNumber(netVotes)}
        </span>
      </div>

      {/* Views */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span className="text-sm">{formatNumber(viewCount)} views</span>
      </div>

      {/* Comments */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm">{formatNumber(commentCount)} comments</span>
      </div>

      {/* Bookmarks */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <Bookmark className="h-4 w-4" />
        <span className="text-sm">{formatNumber(bookmarkCount)} saved</span>
      </div>

      {/* Shares */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <Share2 className="h-4 w-4" />
        <span className="text-sm">{formatNumber(shareCount)} shares</span>
      </div>
    </div>
  );
}
