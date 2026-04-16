/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingService } from "../services/setting.service";
import { ALL_SETTINGS_QUERY_KEY } from "./useAllSettings";
import { UpdateSettingFormValues } from "../schemas/setting.schema";

export function useUpdateSetting(key: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateSettingFormValues) => {
      const response = await settingService.update(key, payload);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_SETTINGS_QUERY_KEY });
      toast.success("Setting updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update setting",
      );
    },
  });
}
