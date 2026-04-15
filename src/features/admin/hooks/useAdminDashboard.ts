"use client";

import { useAdminStats } from "./queries/useAdminStats";
import { usePendingIdeas } from "./queries/usePendingIdeas";
import { useTopIdeas } from "./queries/useTopIdeas";
import { useRecentReports } from "./queries/useRecentReports";
import { useSystemHealth } from "./queries/useSystemHealth";

export function useAdminDashboard() {
  const {
    data: dashboardData,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useAdminStats();
  const {
    data: pendingIdeas,
    isLoading: pendingLoading,
    refetch: refetchPending,
  } = usePendingIdeas();
  const { data: topIdeas, isLoading: topLoading } = useTopIdeas();
  const { data: recentReports, isLoading: reportsLoading } = useRecentReports();
  const { data: systemHealth, isLoading: healthLoading } = useSystemHealth();

  const isLoading =
    statsLoading ||
    pendingLoading ||
    topLoading ||
    reportsLoading ||
    healthLoading;
  const error = statsError;

  const stats = dashboardData?.stats;
  const analytics = dashboardData?.analytics;
  const memberGrowth = dashboardData?.memberGrowth;
  const categoryStats = dashboardData?.categoryStats;

  return {
    stats,
    analytics,
    pendingIdeas,
    topIdeas,
    recentReports,
    memberGrowth,
    categoryStats,
    systemHealth,
    isLoading,
    error,
    refetch: () => {
      refetchStats();
      refetchPending();
    },
  };
}
