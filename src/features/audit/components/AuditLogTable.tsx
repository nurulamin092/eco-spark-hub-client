"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AuditLogRow } from "./AuditLogRow";
import { AuditLogSkeleton } from "./AuditLogSkeleton";
import { AuditLogFilters } from "./AuditLogFilters";
import { useAuditLogs } from "../hooks/useAuditLogs";
import { useAuditFilters } from "../hooks/useAuditFilters";

export function AuditLogTable() {
  const { filters, updateFilter, resetFilters } = useAuditFilters();
  const { data, isLoading, error } = useAuditLogs(filters);

  const handlePageChange = (newPage: number) => {
    updateFilter("page", newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Failed to load audit logs. Please try again later.
      </div>
    );
  }

  const { data: logs, meta } = data || {
    data: [],
    meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
  };

  return (
    <div className="space-y-6">
      <AuditLogFilters
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {isLoading ? (
        <AuditLogSkeleton />
      ) : logs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          No audit logs found
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {logs.map((log) => (
              <AuditLogRow key={log.id} log={log} />
            ))}
          </div>

          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page <= 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {meta.page} of {meta.totalPages} (
                {meta.total.toLocaleString()} total)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page >= meta.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
