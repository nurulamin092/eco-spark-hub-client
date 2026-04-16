/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityType } from "../types/activity.types";

export const ACTIVITY_TYPES: Record<
  ActivityType,
  { label: string; icon: string; color: string }
> = {
  IDEA_CREATED: {
    label: "Created Idea",
    icon: "Lightbulb",
    color: "text-yellow-500",
  },
  COMMENT_ADDED: {
    label: "Added Comment",
    icon: "MessageCircle",
    color: "text-blue-500",
  },
  VOTE_CAST: {
    label: "Voted",
    icon: "ThumbsUp",
    color: "text-green-500",
  },
};

export const ACTIVITY_MESSAGES: Record<ActivityType, (data: any) => string> = {
  IDEA_CREATED: (data) => `created idea "${data?.title || "an idea"}"`,
  COMMENT_ADDED: (data) => `commented on idea "${data?.title || "an idea"}"`,
  VOTE_CAST: (data) =>
    `${data?.voteType === "UP" ? "upvoted" : "downvoted"} an idea`,
};

export const DEFAULT_PAGE_SIZE = 20;
