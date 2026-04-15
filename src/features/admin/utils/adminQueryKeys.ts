/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/utils/adminQueryKeys.ts

export const adminQueryKeys = {
  all: ["admin"] as const,

  // Stats
  stats: () => [...adminQueryKeys.all, "stats"] as const,

  // Ideas
  ideas: () => [...adminQueryKeys.all, "ideas"] as const,
  pendingIdeas: (filters?: any) =>
    [...adminQueryKeys.ideas(), "pending", filters] as const,
  topIdeas: () => [...adminQueryKeys.ideas(), "top"] as const,

  // Reports
  reports: () => [...adminQueryKeys.all, "reports"] as const,
  recentReports: () => [...adminQueryKeys.reports(), "recent"] as const,

  // System
  systemHealth: () => [...adminQueryKeys.all, "health"] as const,

  // Analytics
  analytics: (days: number = 30) =>
    [...adminQueryKeys.all, "analytics", days] as const,

  // Categories
  categories: () => [...adminQueryKeys.all, "categories"] as const,
  categoryStats: () => [...adminQueryKeys.categories(), "stats"] as const,

  // Member
  memberGrowth: () => [...adminQueryKeys.all, "member-growth"] as const,
};
