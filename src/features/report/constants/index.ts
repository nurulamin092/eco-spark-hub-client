import { ReportStatus, ReportType } from "../types/report.types";

export const REPORT_TYPES: Record<
  ReportType,
  { label: string; icon: string; color: string }
> = {
  IDEA: { label: "Idea", icon: "Lightbulb", color: "text-yellow-500" },
  COMMENT: { label: "Comment", icon: "MessageCircle", color: "text-blue-500" },
};

export const REPORT_STATUS: Record<
  ReportStatus,
  { label: string; color: string; bgColor: string }
> = {
  PENDING: {
    label: "Pending",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  REVIEWED: {
    label: "Reviewed",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  DISMISSED: {
    label: "Dismissed",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
  ACTION_TAKEN: {
    label: "Action Taken",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
};

export const REPORT_REASONS = [
  { value: "SPAM", label: "Spam or misleading" },
  { value: "INAPPROPRIATE", label: "Inappropriate content" },
  { value: "COPYRIGHT", label: "Copyright violation" },
  { value: "HARASSMENT", label: "Harassment or hate speech" },
  { value: "MISINFORMATION", label: "Misinformation" },
  { value: "OTHER", label: "Other" },
] as const;
