/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingService } from "../services/setting.service";
import { ALL_SETTINGS_QUERY_KEY } from "./useAllSettings";

export function useDeleteSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const response = await settingService.delete(key);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_SETTINGS_QUERY_KEY });
      toast.success("Setting deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete setting",
      );
    },
  });
}
