// ==================== Components ====================

// Dashboard Components
export { AdminDashboardShell } from "./components/dashboard/AdminDashboardShell";
export {
  StatsGrid,
  StatCard,
  StatsSkeleton,
} from "./components/dashboard/StatsGrid";
export {
  GrowthChart,
  RevenueChart,
  useChartData,
} from "./components/dashboard/Charts";
export {
  SystemHealthWidget,
  HealthMetrics,
} from "./components/dashboard/SystemHealth";

// Ideas Components
// export {
//   PendingIdeasTable,
//   PendingIdeasRow,
// } from "./components/ideas/PendingIdeasTable";
// export { TopIdeasTable, TopIdeasItem } from "./components/ideas/TopIdeas{Table";

export {
  PendingIdeasTable,
  PendingIdeasRow,
} from "@/features/admin/components/dashboard/ideas/PendingIdeasTable";

export {
  TopIdeasTable,
  TopIdeasItem,
} from "@/features/admin/components/dashboard/ideas/TopIdeasTable";

export {
  // Reports Components
  RecentReportsTable,
} from "./components/reports/RecentReportsTable";

// Shared Components (if needed)
// export { ErrorRetry, VirtualTable, InfiniteScroll } from "./components/shared";

// ==================== Hooks ====================
// Combined Hook
export { useAdminDashboard } from "./hooks/useAdminDashboard";

// Query Hooks
export {
  useAdminStats,
  usePendingIdeas,
  useTopIdeas,
  useRecentReports,
  useSystemHealth,
} from "./hooks/queries";

// Mutation Hooks
export {
  useApproveIdea,
  useRejectIdea,
  useBulkAction,
} from "./hooks/mutations";

// ==================== Services ====================
export {
  adminStatsService,
  adminIdeasService,
  adminReportsService,
  adminExportService,
} from "./services";

// ==================== Types ====================
export type {
  DashboardStats,
  PendingIdea,
  TopIdea,
  RecentReport,
  SystemHealth,
  MemberGrowth,
  CategoryStat,
  GrowthAnalytics,
} from "./types/admin.types";

export type {
  ApiResponse,
  PaginatedResponse,
  ErrorResponse,
} from "./types/api.types";

// ==================== Constants ====================
export {
  ADMIN_QUERY_KEYS,
  CHART_COLORS,
  REPORT_STATUS,
  IDEA_STATUS,
  TABLE_PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
  POLLING_INTERVAL,
} from "./constants";
