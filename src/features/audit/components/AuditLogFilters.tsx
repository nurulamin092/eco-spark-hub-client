"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";
import { AuditFilters } from "../types/audit.types";
import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "../constants";

interface AuditLogFiltersProps {
  filters: AuditFilters;
  onFilterChange: (key: keyof AuditFilters, value: string | number) => void;
  onReset: () => void;
}

export function AuditLogFilters({
  filters,
  onFilterChange,
  onReset,
}: AuditLogFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* User ID Filter */}
        <div className="space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <Input
            id="userId"
            placeholder="Filter by user ID..."
            value={filters.userId || ""}
            onChange={(e) => onFilterChange("userId", e.target.value)}
          />
        </div>

        {/* Entity Filter */}
        <div className="space-y-2">
          <Label htmlFor="entity">Entity Type</Label>
          <Select
            value={filters.entity || "all"}
            onValueChange={(v) =>
              onFilterChange("entity", v === "all" ? "" : v)
            }
          >
            <SelectTrigger id="entity">
              <SelectValue placeholder="All entities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              {Object.values(AUDIT_ENTITIES).map((entity) => (
                <SelectItem key={entity} value={entity}>
                  {entity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Filter */}
        <div className="space-y-2">
          <Label htmlFor="action">Action</Label>
          <Select
            value={filters.action || "all"}
            onValueChange={(v) =>
              onFilterChange("action", v === "all" ? "" : v)
            }
          >
            <SelectTrigger id="action">
              <SelectValue placeholder="All actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {Object.values(AUDIT_ACTIONS).map((action) => (
                <SelectItem key={action} value={action}>
                  {action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {(filters.userId || filters.entity || filters.action) && (
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
        <Button size="sm" onClick={() => onFilterChange("page", 1)}>
          <Search className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
