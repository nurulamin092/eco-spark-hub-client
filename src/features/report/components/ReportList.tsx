"use client";

import { useReports } from "../hooks/useReports";
import { ReportItem } from "./ReportItem";
import { ReportSkeleton } from "./ReportSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function ReportList() {
  const { data: reports, isLoading, error, refetch } = useReports();

  if (isLoading) return <ReportSkeleton />;
  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load reports</AlertDescription>
      </Alert>
    );

  if (!reports?.length)
    return (
      <div className="text-center py-12 text-muted-foreground">
        No reports found
      </div>
    );

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <ReportItem
          key={report.id}
          report={report}
          onUpdate={() => refetch()}
        />
      ))}
    </div>
  );
}
