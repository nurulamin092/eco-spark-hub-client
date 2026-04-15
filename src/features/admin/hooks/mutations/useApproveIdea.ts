"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminIdeasService } from "../../services/adminIdeas.service";
import { ADMIN_QUERY_KEYS } from "../../constants";

export function useApproveIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ideaId: string) => {
      const response = await adminIdeasService.approveIdea(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.PENDING_IDEAS],
      });
      queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEYS.STATS] });
      toast.success("Idea approved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve idea");
    },
  });
}
