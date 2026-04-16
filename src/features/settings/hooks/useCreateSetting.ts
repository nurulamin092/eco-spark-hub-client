/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingService } from "../services/setting.service";
import { ALL_SETTINGS_QUERY_KEY } from "./useAllSettings";
import { CreateSettingFormValues } from "../schemas/setting.schema";

export function useCreateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSettingFormValues) => {
      const response = await settingService.create(payload);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_SETTINGS_QUERY_KEY });
      toast.success("Setting created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create setting",
      );
    },
  });
}
