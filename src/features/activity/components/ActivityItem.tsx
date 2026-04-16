"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Lightbulb, MessageCircle, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, ActivityType } from "../types/activity.types";

interface ActivityItemProps {
  activity: Activity;
  showUser?: boolean;
}

const iconMap: Record<ActivityType, React.ReactNode> = {
  IDEA_CREATED: <Lightbulb className="h-4 w-4 text-yellow-500" />,
  COMMENT_ADDED: <MessageCircle className="h-4 w-4 text-blue-500" />,
  VOTE_CAST: <ThumbsUp className="h-4 w-4 text-green-500" />,
};

const getActivityMessage = (activity: Activity): string => {
  const { type, data } = activity;
  switch (type) {
    case "IDEA_CREATED":
      return `created idea "${data?.title || "an idea"}"`;
    case "COMMENT_ADDED":
      return `commented on an idea`;
    case "VOTE_CAST":
      return `${data?.voteType === "UP" ? "upvoted" : "downvoted"} an idea`;
    default:
      return "performed an action";
  }
};

export function ActivityItem({
  activity,
  showUser = false,
}: ActivityItemProps) {
  const message = getActivityMessage(activity);
  const timeAgo = formatDistanceToNow(new Date(activity.createdAt), {
    addSuffix: true,
  });

  // Get first letter of name for avatar fallback
  const getInitials = (name: string): string => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
      {showUser && activity.user ? (
        <Avatar className="h-8 w-8">
          {/* Image is not available in the API response, using fallback only */}
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {getInitials(activity.user.name)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {iconMap[activity.type]}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {showUser && activity.user && (
            <span className="font-medium text-sm">{activity.user.name}</span>
          )}
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
          {activity.data?.ideaId && (
            <Link
              href={`/ideas/${activity.data.ideaId}`}
              className="text-xs text-primary hover:underline"
            >
              View idea →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
