// ============ src/features/admin/components/dashboard/AdminDashboardShell.tsx ============
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import { StatsGrid } from "./stats/StatsGrid";

import { PendingIdeasTable, TopIdeasTable } from "./tables";
import { SystemHealthWidget } from "./health/SystemHealthWidget";
import { GrowthChart, RevenueChart } from "./charts";

const defaultStats = {
  users: 0,
  ideas: 0,
  ideaStatus: { approved: 0, pending: 0, rejected: 0 },
  reports: 0,
  revenue: 0,
};

export function AdminDashboardShell() {
  const {
    stats,
    analytics,
    pendingIdeas,
    topIdeas,
    systemHealth,
    isLoading,
    error,
    refetch,
  } = useAdminDashboard();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load dashboard data.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats || defaultStats} isLoading={isLoading} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GrowthChart data={analytics?.ideas || []} isLoading={isLoading} />
        <RevenueChart data={analytics?.revenue || []} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingIdeasTable
          ideas={pendingIdeas || []}
          isLoading={isLoading}
          onRefresh={refetch}
        />
        <TopIdeasTable ideas={topIdeas || []} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealthWidget health={systemHealth!} isLoading={isLoading} />
      </div>
    </div>
  );
}
