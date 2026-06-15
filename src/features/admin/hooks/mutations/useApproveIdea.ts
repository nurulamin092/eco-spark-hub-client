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
      console.log(`🚀 [useApproveIdea] Approving idea: ${ideaId}`);
      await adminIdeasService.approveIdea(ideaId);
      return { success: true, ideaId };
    },
    onSuccess: (_, ideaId) => {
      console.log(` [useApproveIdea] Success for idea: ${ideaId}`);

      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: ["admin-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pending-ideas"] });

      toast.success("Idea approved successfully");
    },
    onError: (error: any) => {
      console.error(`❌ [useApproveIdea] Error:`, error);

      // Extract meaningful error message
      let errorMessage = "Failed to approve idea";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Check for specific error conditions
      if (errorMessage.includes("UNDER_REVIEW")) {
        errorMessage =
          "This idea is not pending review. It may have been already approved or rejected.";
      } else if (errorMessage.includes("not found")) {
        errorMessage = "Idea not found. It may have been deleted.";
      }

      toast.error(errorMessage);
    },
  });
}
