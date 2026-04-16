"use client";

import { useQuery } from "@tanstack/react-query";
import { activityService } from "../services/activity.service";
import { ActivityFilters } from "../types/activity.types";

export const MY_ACTIVITIES_QUERY_KEY = ["my-activities"] as const;

export function useMyActivities(filters: ActivityFilters = {}) {
  return useQuery({
    queryKey: [...MY_ACTIVITIES_QUERY_KEY, filters],
    queryFn: async () => {
      const response = await activityService.getMyActivities(filters);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}
