// ============ src/features/idea/details/components/IdeaHeader.tsx ============
"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, DollarSign, Lock } from "lucide-react";
import { Idea } from "../../shared/types/idea.types";

interface IdeaHeaderProps {
  idea: Idea;
}

// ✅ Safe date formatter
function formatDate(date: string | undefined | null): string {
  if (!date) return "Unknown date";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}

export function IdeaHeader({ idea }: IdeaHeaderProps) {
  const isLocked = idea.isLocked ?? idea.isPaid;
  const publishedDate = idea.publishedAt || idea.createdAt;

  return (
    <div className="space-y-4">
      {/* Category and Status Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          style={{ backgroundColor: idea.category?.color || undefined }}
          className="text-white"
        >
          {idea.category?.name || "Uncategorized"}
        </Badge>
        {idea.isPaid && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />${idea.price ?? 0}
          </Badge>
        )}
        {isLocked && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Premium Content
          </Badge>
        )}
        {idea.isFeatured && <Badge variant="default">Featured</Badge>}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {idea.title || "Untitled Idea"}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={idea.author?.image || ""} />
          <AvatarFallback>{idea.author?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">
              {idea.author?.name || "Unknown Author"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Published {formatDate(publishedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
