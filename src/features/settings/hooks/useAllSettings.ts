"use client";

import { useQuery } from "@tanstack/react-query";
import { settingService } from "../services/setting.service";

export const ALL_SETTINGS_QUERY_KEY = ["all-settings"] as const;

export function useAllSettings() {
  return useQuery({
    queryKey: ALL_SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const response = await settingService.getAll();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}
