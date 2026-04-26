// ============ src/features/admin/components/dashboard/charts/GrowthChart.tsx ============
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartData } from "./useChartData";

interface GrowthChartProps {
  data: Array<{ date: string; count: number }>;
  isLoading?: boolean;
  title?: string;
}

export function GrowthChart({
  data,
  isLoading,
  title = "Ideas Growth (30 Days)",
}: GrowthChartProps) {
  const { formattedData, total } = useChartData(data);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!formattedData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-24">
            No data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <div className="flex h-full items-end gap-2">
            {formattedData.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-primary/20 hover:bg-primary/30 transition-all rounded-t"
                  style={{ height: `${item.percentage}%` }}
                />
                <span className="text-xs text-muted-foreground rotate-45 origin-left">
                  {item.formattedDate}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Total: {total.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
