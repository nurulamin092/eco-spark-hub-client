// ============ src/features/admin/components/dashboard/stats/StatsGrid.tsx ============
"use client";

import {
  Users,
  Lightbulb,
  DollarSign,
  Flag,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { StatsSkeleton } from "./StatsSkeleton";
import type { DashboardStats } from "../../../types/admin.types";

interface StatsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  if (isLoading) return <StatsSkeleton />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.users.toLocaleString()}
          icon={Users}
        />
        <StatCard
          title="Total Ideas"
          value={stats.ideas.toLocaleString()}
          icon={Lightbulb}
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard
          title="Reports"
          value={stats.reports.toLocaleString()}
          icon={Flag}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Approved"
          value={stats.ideaStatus.approved.toLocaleString()}
          icon={CheckCircle}
          iconColor="text-green-500"
          iconBgColor="bg-green-500/10"
        />
        <StatCard
          title="Pending Review"
          value={stats.ideaStatus.pending.toLocaleString()}
          icon={Clock}
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-500/10"
        />
        <StatCard
          title="Rejected"
          value={stats.ideaStatus.rejected.toLocaleString()}
          icon={XCircle}
          iconColor="text-red-500"
          iconBgColor="bg-red-500/10"
        />
      </div>
    </>
  );
}
