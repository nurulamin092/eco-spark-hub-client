/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MEMBER_QUERY_KEYS } from "../../constants/member.query-keys";
import { toast } from "sonner";
import { memberService } from "../../services/member.service";

export function useBulkActivateMembers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => memberService.bulkActivateMembers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBER_QUERY_KEYS.all });
      toast.success("Members activated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Bulk activation failed");
    },
  });
}
