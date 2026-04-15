"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Flag } from "lucide-react";
import { RecentReport } from "../../types/admin.types";

interface RecentReportsTableProps {
  reports: RecentReport[];
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500",
  REVIEWED: "bg-blue-500/10 text-blue-500",
  DISMISSED: "bg-gray-500/10 text-gray-500",
  ACTION_TAKEN: "bg-red-500/10 text-red-500",
};

export function RecentReportsTable({
  reports,
  isLoading,
}: RecentReportsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (reports.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-500" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No reports found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-red-500" />
          Recent Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{report.reason}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>Reported by: {report.reporter.name}</span>
                {report.idea && <span>Idea: {report.idea.title}</span>}
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <Badge className={statusColors[report.status]}>
              {report.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
