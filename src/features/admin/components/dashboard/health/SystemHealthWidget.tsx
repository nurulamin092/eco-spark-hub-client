// ============ src/features/admin/components/dashboard/health/SystemHealthWidget.tsx ============
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";
import { HealthMetrics } from "./HealthMetrics";
import type { SystemHealth } from "../../../types/admin.types";

interface SystemHealthWidgetProps {
  health: SystemHealth;
  isLoading?: boolean;
}

export function SystemHealthWidget({
  health,
  isLoading,
}: SystemHealthWidgetProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <HealthMetrics health={health} />
        <div className="text-xs text-muted-foreground text-center pt-4">
          Last updated: {new Date(health.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
