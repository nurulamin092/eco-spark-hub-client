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
      <Card
        className="group
    glass
    border-gradient
    relative
    flex
    h-full
    flex-col
    overflow-hidden
    rounded-3xl
    border-0
    shadow-card
    transition-all
    duration-500
    hover:-translate-y-2
    hover:scale-[1.02]
    hover:border-primary/20
    hover:shadow-premium"
      >
        <div
          aria-hidden="true"
          className="
   pointer-events-none
    absolute
    inset-0
    rounded-3xl
    bg-linear-to-br
    from-white/10
    via-transparent
    to-transparent
    opacity-0
    transition-opacity
    duration-500
    group-hover:opacity-100
  "
        />
        <CardHeader
          className="  relative
    space-y-6
    pb-0"
        >
          {/* Top Section */}
          <div
            className="flex
    items-start
    justify-between
    gap-4"
          >
            <Badge
              style={{
                backgroundColor: idea.category.color || "#16a34a",
              }}
              className="
    rounded-full
    px-3
    py-1
    text-xs
    font-semibold
    shadow-sm
  "
            >
              {idea.category.name}
            </Badge>

            <div
              className=" flex
    items-center
    gap-2
    shrink-0"
            >
              {idea.isPaid && (
                <Badge
                  variant="secondary"
                  className="  rounded-full
    px-3
    py-1
    font-medium"
                >
                  <DollarSign
                    className="flex
items-center
gap-1
rounded-full
px-3
py-1
font-medium"
                  />
                  {idea.price}
                </Badge>
              )}

              {idea.isLocked && (
                <Badge
                  variant="secondary"
                  className="  rounded-full
    px-3
    py-1
    font-medium"
                >
                  <Lock
                    className="flex
items-center
gap-1
rounded-full
px-3
py-1
font-medium"
                  />
                  Premium
                </Badge>
              )}
            </div>
          </div>

          {/* Title */}
          <CardTitle
            className=" line-clamp-2
    text-2xl
    font-bold
    leading-tight
    tracking-tight
    transition-colors
    duration-300
    group-hover:text-primary"
          >
            {idea.title}
          </CardTitle>
          <div className="h-px w-full bg-border/60" />
        </CardHeader>

        <CardContent
          className="relative
    flex-1
    pt-6"
        >
          {/* Description */}
          <p className="line-clamp-3 text-sm leading-7 text-muted-foreground/80">
            {idea.description}
          </p>
        </CardContent>

        <CardFooter
          className="relative
flex
flex-col
items-start
gap-5
pt-2
pb-6"
        >
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
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
            <div
              className="flex
items-center
gap-1
rounded-full
bg-primary/10
px-3
py-1
text-xs
font-medium"
            >
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
            <Avatar className="h-9 w-9">
              <AvatarImage src={idea.author.image || ""} />
              <AvatarFallback>
                {idea.author.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium">{idea.author.name}</span>

              <span className="text-xs text-muted-foreground">
                Idea Creator
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
