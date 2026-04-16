/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reportService } from "../services/report.service";
import { REPORTS_QUERY_KEY } from "./useCreateReport";
import { UpdateReportStatusFormValues } from "../schemas/report.schema";

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reportId,
      payload,
    }: {
      reportId: string;
      payload: UpdateReportStatusFormValues;
    }) => {
      const response = await reportService.updateStatus(reportId, payload);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORTS_QUERY_KEY });
      toast.success("Report status updated");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update report status",
      );
    },
  });
}
