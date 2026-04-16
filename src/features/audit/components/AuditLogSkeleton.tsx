"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function AuditLogSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-40 flex-1" />
          <Skeleton className="h-5 w-28" />
        </div>
      ))}
    </div>
  );
}
