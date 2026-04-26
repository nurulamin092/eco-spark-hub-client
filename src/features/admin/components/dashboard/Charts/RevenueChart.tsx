// ============ src/features/admin/components/dashboard/charts/RevenueChart.tsx ============
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartData } from "./useChartData";

interface RevenueChartProps {
  data: Array<{ date: string; total: number }>;
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  const chartData = data.map((d) => ({ date: d.date, count: d.total }));
  const { formattedData, total } = useChartData(chartData);

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
          <CardTitle>Revenue Growth (30 Days)</CardTitle>
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
        <CardTitle>Revenue Growth (30 Days)</CardTitle>
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
                  className="w-full bg-green-500/20 hover:bg-green-500/30 transition-all rounded-t"
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
          Total Revenue: ${total.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
