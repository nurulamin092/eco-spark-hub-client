"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminIdeasService } from "../../services/adminIdeas.service";
import { ADMIN_QUERY_KEYS } from "../../constants";

type BulkActionType = "approve" | "reject";

export function useBulkAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      action,
      ids,
      feedback,
    }: {
      action: BulkActionType;
      ids: string[];
      feedback?: string;
    }) => {
      if (action === "approve") {
        const response = await adminIdeasService.bulkApprove(ids);
        if (!response.success) throw new Error(response.message);
        return response;
      } else {
        if (!feedback) throw new Error("Feedback required for rejection");
        const response = await adminIdeasService.bulkReject(ids, feedback);
        if (!response.success) throw new Error(response.message);
        return response;
      }
    },
    onSuccess: (_, { action }) => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.PENDING_IDEAS],
      });
      queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEYS.STATS] });
      toast.success(`Ideas ${action}ed successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Bulk action failed");
    },
  });
}
