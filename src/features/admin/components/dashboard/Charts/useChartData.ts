"use client";

import { useMemo } from "react";

interface ChartDataPoint {
  date: string;
  count: number;
}

export function useChartData(data: ChartDataPoint[] = []) {
  const maxCount = useMemo(
    () => Math.max(...data.map((d) => d.count), 1),
    [data],
  );
  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.count, 0),
    [data],
  );

  const formattedData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        percentage: (item.count / maxCount) * 100,
        formattedDate: new Date(item.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
      })),
    [data, maxCount],
  );

  return { maxCount, total, formattedData };
}
