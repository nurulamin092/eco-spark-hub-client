export const BLOG_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export const BLOG_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export const BLOG_STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-yellow-500/10 text-yellow-500",
  PUBLISHED: "bg-green-500/10 text-green-500",
  ARCHIVED: "bg-gray-500/10 text-gray-500",
};

export const DEFAULT_PAGE_SIZE = 9;
