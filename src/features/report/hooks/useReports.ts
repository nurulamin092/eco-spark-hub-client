"use client";

import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";
import { REPORTS_QUERY_KEY } from "./useCreateReport";

export function useReports() {
  return useQuery({
    queryKey: REPORTS_QUERY_KEY,
    queryFn: async () => {
      const response = await reportService.getAll();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}
