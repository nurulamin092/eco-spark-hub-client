/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reportService } from "../services/report.service";
import { CreateReportFormValues } from "../schemas/report.schema";

export const REPORTS_QUERY_KEY = ["reports"] as const;

export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReportFormValues) => {
      const response = await reportService.create(payload);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORTS_QUERY_KEY });
      toast.success("Report submitted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit report",
      );
    },
  });
}
