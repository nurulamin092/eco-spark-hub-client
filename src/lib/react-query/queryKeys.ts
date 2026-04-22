/* eslint-disable @typescript-eslint/no-explicit-any */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
    sessions: ["auth", "sessions"] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
  },
  ideas: {
    all: ["ideas"] as const,
    list: (filters?: unknown) => ["ideas", "list", filters] as const,
    detail: (id: string) => ["ideas", "detail", id] as const,
    myIdeas: (params?: unknown) => ["ideas", "my-ideas", params] as const,
    testimonials: (limit?: number) => ["ideas", "testimonials", limit] as const,
    featured: (limit?: number) => ["ideas", "featured", limit] as const,
  },
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    list: (filters?: any) =>
      [...queryKeys.categories.lists(), filters] as const,
    details: () => [...queryKeys.categories.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
  },
  votes: {
    userVote: (ideaId: string) => ["votes", "user", ideaId] as const,
    myVotes: (params?: any) => ["votes", "my-votes", params] as const,
  },
  comments: {
    byIdea: (ideaId: string) => ["comments", "by-idea", ideaId] as const,
  },
  bookmarks: {
    all: ["bookmarks"] as const,
    list: (page?: number, limit?: number) =>
      ["bookmarks", "list", { page, limit }] as const,
    check: (ideaId: string) => ["bookmarks", "check", ideaId] as const,
  },
  payments: {
    myPayments: ["payments", "my-payments"] as const,
    verifyAccess: (ideaId: string) => ["payments", "verify", ideaId] as const,
  },
  newsletter: {
    subscribe: ["newsletter", "subscribe"] as const,
    subscribers: (params?: unknown) =>
      ["newsletter", "subscribers", params] as const,
  },
  admin: {
    dashboard: ["admin", "dashboard"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    unread: ["notifications", "unread"] as const,
  },
  audit: {
    logs: (filters?: unknown) => ["audit", "logs", filters] as const,
  },
  activities: {
    my: (filters?: unknown) => ["activities", "my", filters] as const,
    all: (filters?: unknown) => ["activities", "all", filters] as const,
  },
};
