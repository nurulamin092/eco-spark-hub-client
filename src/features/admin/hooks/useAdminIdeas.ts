"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminIdeasService } from "../services/adminIdeas.service";
import { AdminIdeasFilters } from "../types/admin.types";

export function useAdminIdeas(filters: AdminIdeasFilters) {
  const stableFilters = useMemo<AdminIdeasFilters>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      status: filters.status,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    }),
    [
      filters.page,
      filters.limit,
      filters.search,
      filters.status,
      filters.sortBy,
      filters.sortOrder,
    ],
  );

  return useQuery({
    queryKey: ["admin-ideas", stableFilters],
    queryFn: () => adminIdeasService.getAllIdeas(stableFilters),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
