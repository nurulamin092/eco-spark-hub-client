/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/features/admin/hooks/mutations/useApproveIdea.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminIdeasService } from "../../services/adminIdeas.service";

export function useApproveIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ideaId: string) => {
      await adminIdeasService.approveIdea(ideaId);
      return { success: true };
    },
    onSuccess: (_, ideaId) => {
      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pending-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "idea", ideaId] });
      queryClient.invalidateQueries({ queryKey: ["ideas", "list"] });
      queryClient.invalidateQueries({ queryKey: ["ideas", "detail", ideaId] });

      toast.success("Idea approved successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to approve idea";
      toast.error(errorMessage);
    },
  });
}
