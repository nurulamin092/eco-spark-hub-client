"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ReportSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (<div key={i} className="flex items-start gap-4 p-4 border rounded-lg"><Skeleton className="h-16 w-full" /></div>))}
    </div>
  );
}