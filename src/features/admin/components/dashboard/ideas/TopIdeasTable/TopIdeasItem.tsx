"use client";

import Link from "next/link";
import { TrendingUp, Eye } from "lucide-react";
import { TopIdea } from "@/features/admin/types/admin.types";

interface TopIdeasItemProps {
  idea: TopIdea;
  rank: number;
}

export function TopIdeasItem({ idea, rank }: TopIdeasItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-muted-foreground w-6">
          #{rank}
        </span>
        <div>
          <Link
            href={`/ideas/${idea.id}`}
            className="font-medium hover:text-primary"
          >
            {idea.title}
          </Link>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>By: {idea.author.name}</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{idea.upvoteCount} upvotes</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{idea.viewCount} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
