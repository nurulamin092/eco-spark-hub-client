"use client";

import { useQuery } from "@tanstack/react-query";
import { activityService } from "../services/activity.service";
import { ActivityFilters } from "../types/activity.types";

export const ALL_ACTIVITIES_QUERY_KEY = ["all-activities"] as const;

export function useAllActivities(filters: ActivityFilters = {}) {
  return useQuery({
    queryKey: [...ALL_ACTIVITIES_QUERY_KEY, filters],
    queryFn: async () => {
      const response = await activityService.getAllActivities(filters);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}
