import { apiClient } from "@/lib/api/base";
import { ActivitiesResponse, ActivityFilters } from "../types/activity.types";

export const activityService = {
  getMyActivities: async (
    filters?: ActivityFilters,
  ): Promise<ActivitiesResponse> => {
    const response = await apiClient.get("/activities/me", { params: filters });
    return response.data;
  },

  getAllActivities: async (
    filters?: ActivityFilters,
  ): Promise<ActivitiesResponse> => {
    const response = await apiClient.get("/activities", { params: filters });
    return response.data;
  },
};
