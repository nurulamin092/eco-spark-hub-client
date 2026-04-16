"use client";

import { useQuery } from "@tanstack/react-query";
import { settingService } from "../services/setting.service";

export const PUBLIC_SETTINGS_QUERY_KEY = ["public-settings"] as const;

export function usePublicSettings() {
  return useQuery({
    queryKey: PUBLIC_SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const response = await settingService.getPublic();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
