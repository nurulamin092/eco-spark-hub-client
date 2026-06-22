"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Lock,
} from "lucide-react";
import { Idea } from "../../shared/types/idea.types";

interface IdeaCardProps {
  idea: Idea;
}

function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(num)) {
    return "0";
  }
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const netVotes = idea.upvoteCount - idea.downvoteCount;

  return (
    <Link href={`/ideas/${idea.id}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <CardHeader>
          {/* Top Section */}
          <div className="flex items-start justify-between gap-2">
            <Badge
              style={{ backgroundColor: idea.category.color || undefined }}
            >
              {idea.category.name}
            </Badge>

            <div className="flex items-center gap-2">
              {idea.isPaid && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {idea.price}
                </Badge>
              )}

              {idea.isLocked && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
          </div>

          {/* Title */}
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
            {idea.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Description */}
          <p className="text-muted-foreground line-clamp-3">
            {idea.description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {/* Votes */}
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span>{formatNumber(idea.upvoteCount)}</span>

              <ArrowDown className="h-4 w-4 text-red-500 ml-1" />
              <span>{formatNumber(idea.downvoteCount)}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{formatNumber(idea.commentCount)}</span>
            </div>

            {/* Views */}
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(idea.viewCount)}</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1 font-medium">
              <span>Score:</span>
              <span
                className={
                  netVotes > 0
                    ? "text-green-600"
                    : netVotes < 0
                      ? "text-red-600"
                      : "text-muted-foreground"
                }
              >
                {formatNumber(netVotes)}
              </span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={idea.author.image || ""} />
              <AvatarFallback>
                {idea.author.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <span className="text-sm text-muted-foreground">
              {idea.author.name}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
