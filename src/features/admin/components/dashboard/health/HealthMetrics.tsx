// ============ src/features/admin/components/dashboard/health/HealthMetrics.tsx ============
"use client";

import { Users, Lightbulb, Server } from "lucide-react";
import type { SystemHealth } from "../../../types/admin.types";

interface HealthMetricsProps {
  health: SystemHealth;
}

const metrics = [
  {
    key: "activeUsers24h",
    label: "Active Users (24h)",
    icon: Users,
    color: "text-blue-500",
  },
  {
    key: "newIdeas24h",
    label: "New Ideas (24h)",
    icon: Lightbulb,
    color: "text-yellow-500",
  },
  {
    key: "activeSessions",
    label: "Active Sessions",
    icon: Server,
    color: "text-green-500",
  },
];

export function HealthMetrics({ health }: HealthMetricsProps) {
  const getValue = (key: string): string => {
    switch (key) {
      case "activeUsers24h":
        return health.activeUsers24h.toLocaleString();
      case "newIdeas24h":
        return health.newIdeas24h.toLocaleString();
      case "activeSessions":
        return health.activeSessions.toLocaleString();
      default:
        return "0";
    }
  };

  return (
    <div className="space-y-3">
      {metrics.map((metric) => (
        <div
          key={metric.key}
          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
            <span className="text-sm font-medium">{metric.label}</span>
          </div>
          <span className="text-lg font-semibold">{getValue(metric.key)}</span>
        </div>
      ))}
    </div>
  );
}
