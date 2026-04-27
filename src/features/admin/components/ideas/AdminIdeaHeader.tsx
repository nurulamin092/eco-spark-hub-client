// ============ src/features/admin/components/ideas/AdminIdeaHeader.tsx ============
"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, DollarSign } from "lucide-react";
import type { Idea } from "@/features/idea/shared/types/idea.types";

interface AdminIdeaHeaderProps {
  idea: Idea;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-500/10 text-gray-500",
  UNDER_REVIEW: "bg-yellow-500/10 text-yellow-500",
  APPROVED: "bg-green-500/10 text-green-500",
  REJECTED: "bg-red-500/10 text-red-500",
};

const statusLabels: Record<string, string> = {
  DRAFT: "Draft",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function AdminIdeaHeader({ idea }: AdminIdeaHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Status and Category Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge className={statusColors[idea.status]}>
          {statusLabels[idea.status]}
        </Badge>
        <Badge style={{ backgroundColor: idea.category.color || undefined }}>
          {idea.category.name}
        </Badge>
        {idea.isPaid && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />${idea.price}
          </Badge>
        )}
        {idea.isFeatured && <Badge variant="default">Featured</Badge>}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {idea.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={idea.author.image || ""} />
          <AvatarFallback>{idea.author.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">{idea.author.name}</span>
            <span className="text-xs text-muted-foreground">
              ({idea.author.email})
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Submitted {formatDate(idea.createdAt)}</span>
            {idea.publishedAt && (
              <>
                <span>•</span>
                <span>Published {formatDate(idea.publishedAt)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
