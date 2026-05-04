export const ADMIN_QUERY_KEYS = {
  STATS: "admin-stats",
  PENDING_IDEAS: "admin-pending-ideas",
  TOP_IDEAS: "admin-top-ideas",
  REPORTS: "admin-reports",
  SYSTEM_HEALTH: "admin-system-health",
} as const;

export const MEMBERS_QUERY_KEYS = {
  all: ["admin", "members"] as const,
  lists: () => [...MEMBERS_QUERY_KEYS.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...MEMBERS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...MEMBERS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...MEMBERS_QUERY_KEYS.details(), id] as const,
  stats: () => [...MEMBERS_QUERY_KEYS.all, "stats"] as const,
};

export const MEMBER_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active", color: "green" },
  { value: "INACTIVE", label: "Inactive", color: "yellow" },
  { value: "BLOCKED", label: "Blocked", color: "red" },
  { value: "DELETED", label: "Deleted", color: "gray" },
];

export const CHART_COLORS = {
  primary: "#10b981",
  secondary: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
  muted: "#6b7280",
} as const;

export const REPORT_STATUS = {
  PENDING: "PENDING",
  REVIEWED: "REVIEWED",
  DISMISSED: "DISMISSED",
  ACTION_TAKEN: "ACTION_TAKEN",
} as const;

export const IDEA_STATUS = {
  DRAFT: "DRAFT",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const TABLE_PAGE_SIZES = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 25;

export const POLLING_INTERVAL = 30000;
