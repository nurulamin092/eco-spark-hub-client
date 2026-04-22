"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export const ADMIN_QUERY_KEYS = {
  dashboard: "admin-dashboard",
} as const;

export function useAdminDashboard() {
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [ADMIN_QUERY_KEYS.dashboard],
    queryFn: () => adminService.getFullDashboard(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
  });

  return {
    stats: dashboardData?.stats,
    analytics: dashboardData?.analytics,
    pendingIdeas: dashboardData?.pendingIdeas,
    topIdeas: dashboardData?.topIdeas,
    recentReports: dashboardData?.reports,
    memberGrowth: dashboardData?.memberGrowth,
    categoryStats: dashboardData?.categoryStats,
    systemHealth: dashboardData?.systemHealth,
    isLoading,
    error,
    refetch,
  };
}

