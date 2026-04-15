export interface DashboardStats {
  users: number;
  ideas: number;
  ideaStatus: {
    approved: number;
    pending: number;
    rejected: number;
  };
  reports: number;
  revenue: number;
}

export interface GrowthAnalytics {
  ideas: Array<{ date: string; count: number }>;
  revenue: Array<{ date: string; total: number }>;
}

export interface TopIdea {
  id: string;
  title: string;
  upvoteCount: number;
  viewCount: number;
  author: {
    name: string;
    email: string;
  };
}

export interface PendingIdea {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface RecentReport {
  id: string;
  reason: string;
  status: string;
  createdAt: string;
  reporter: {
    name: string;
    email: string;
  };
  idea?: {
    id: string;
    title: string;
  };
  comment?: {
    id: string;
    content: string;
  };
}

export interface MemberGrowth {
  last7Days: Array<{ date: string; count: number }>;
  totalActive: number;
  totalBlocked: number;
}

export interface CategoryStat {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  icon: string | null;
  ideaCount: number;
}

export interface SystemHealth {
  activeUsers24h: number;
  newIdeas24h: number;
  activeSessions: number;
  timestamp: string;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    stats: DashboardStats;
    analytics: GrowthAnalytics;
    topIdeas: TopIdea[];
    pendingIdeas: PendingIdea[];
    recentReports: RecentReport[];
    memberGrowth: MemberGrowth;
    categoryStats: CategoryStat[];
    systemHealth: SystemHealth;
  };
}

export interface ApproveIdeaResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
  };
}

export interface RejectIdeaResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
    adminFeedback: string;
  };
}

export interface BulkActionResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
  };
}

export interface PendingIdeasFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface TopIdeasFilters {
  limit?: number;
  timeRange?: "week" | "month" | "all";
}
export interface ReportsFilters {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}
