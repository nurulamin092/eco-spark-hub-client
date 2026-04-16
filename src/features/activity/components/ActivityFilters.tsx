"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import {
  ActivityFilters as ActivityFiltersType,
  ActivityType,
} from "../types/activity.types";
import { ACTIVITY_TYPES } from "../constants";

interface ActivityFiltersProps {
  filters: ActivityFiltersType;
  onFilterChange: (
    key: keyof ActivityFiltersType,
    value: string | number | ActivityType | undefined,
  ) => void;
  onReset: () => void;
  showUserFilter?: boolean;
}

export function ActivityFilters({
  filters,
  onFilterChange,
  onReset,
  showUserFilter = false,
}: ActivityFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Activity Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="type">Activity Type</Label>
          <Select
            value={filters.type || "all"}
            onValueChange={(v) =>
              onFilterChange(
                "type",
                v === "all" ? undefined : (v as ActivityType),
              )
            }
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="All activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              {Object.entries(ACTIVITY_TYPES).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* User ID Filter (Admin only) */}
        {showUserFilter && (
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <input
              id="userId"
              type="text"
              placeholder="Filter by user ID..."
              value={filters.userId || ""}
              onChange={(e) => onFilterChange("userId", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Limit Filter */}
        <div className="space-y-2">
          <Label htmlFor="limit">Items per page</Label>
          <Select
            value={String(filters.limit || 20)}
            onValueChange={(v) => onFilterChange("limit", parseInt(v))}
          >
            <SelectTrigger id="limit">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {(filters.type || filters.userId) && (
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
        <Button size="sm" onClick={() => onFilterChange("page", 1)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
