"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActivityItem } from "./ActivityItem";
import { ActivitySkeleton } from "./ActivitySkeleton";
import { ActivityFilters } from "./ActivityFilters";
import { useMyActivities } from "../hooks/useMyActivities";
import { useActivityFilters } from "../hooks/useActivityFilters";

interface ActivityFeedProps {
  showUser?: boolean;
  title?: string;
  emptyMessage?: string;
}

export function ActivityFeed({
  showUser = false,
  title = "Your Activity",
  emptyMessage = "No activity yet",
}: ActivityFeedProps) {
  const { filters, updateFilter, resetFilters } = useActivityFilters();
  const { data, isLoading, error } = useMyActivities(filters);

  const handlePageChange = (newPage: number) => {
    updateFilter("page", newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Failed to load activity feed. Please try again later.
      </div>
    );
  }

  const { data: activities, meta } = data || {
    data: [],
    meta: { page: 1, limit: 20, total: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <ActivityFilters
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {isLoading ? (
        <ActivitySkeleton />
      ) : activities.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                showUser={showUser}
              />
            ))}
          </div>

          {meta.total > filters.limit! && (
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
                Page {meta.page} of {Math.ceil(meta.total / filters.limit!)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page >= Math.ceil(meta.total / filters.limit!)}
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
