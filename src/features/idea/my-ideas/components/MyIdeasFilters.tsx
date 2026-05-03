// ============ src/features/idea/my-ideas/components/MyIdeasFilters.tsx ============
"use client";

import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdeaStatus } from "../types/my-ideas.types";

interface MyIdeasFiltersProps {
  search: string;
  status: IdeaStatus | "ALL";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: IdeaStatus | "ALL") => void;
}

const statusOptions = [
  { value: "ALL", label: "All Status" },
  { value: "DRAFT", label: "Draft", color: "bg-gray-500" },
  { value: "UNDER_REVIEW", label: "Under Review", color: "bg-yellow-500" },
  { value: "APPROVED", label: "Approved", color: "bg-green-500" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-500" },
];

export function MyIdeasFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: MyIdeasFiltersProps) {
  const handleClearSearch = useCallback(() => {
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search your ideas by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
          aria-label="Search ideas"
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Status Filter */}
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as IdeaStatus | "ALL")}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.value !== "ALL" && (
                  <div className={`h-2 w-2 rounded-full ${option.color}`} />
                )}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
