// ============ src/features/admin/types/admin.types.ts ============
import { PaginationMeta } from "@/features/idea/shared/types/idea.types";

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
  author: { name: string; email: string };
}

export interface PendingIdea {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  author: { id: string; name: string; email: string };
  category: { id: string; name: string };
}

export interface RecentReport {
  id: string;
  reason: string;
  status: string;
  createdAt: string;
  reporter: { name: string; email: string };
  idea?: { id: string; title: string };
  comment?: { id: string; content: string };
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

export interface FullDashboardData {
  stats: DashboardStats;
  analytics: GrowthAnalytics;
  topIdeas: TopIdea[];
  reports: RecentReport[];
  pendingIdeas: PendingIdea[];
  recentActivities: unknown[];
  memberGrowth: MemberGrowth;
  categoryStats: CategoryStat[];
  systemHealth: SystemHealth;
}
export interface Member {
  id: string;
  name: string;
  email: string;
  user: {
    id: string;
    email: string;
    role: string;
    status: string;
  };
}


export interface AdminIdea {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  upvoteCount: number;
  downvoteCount: number;
  viewCount: number;
  commentCount: number;
  isPaid: boolean;
  price: number | null;
  createdAt: string;
  updatedAt: string;
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

export interface AdminIdeasFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  sortBy?: "createdAt" | "updatedAt" | "upvoteCount";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  meta: PaginationMeta;
  data: T[];
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
