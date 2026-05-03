/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/features/admin/hooks/mutations/useRejectIdea.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminIdeasService } from "../../services/adminIdeas.service";

interface RejectIdeaParams {
  ideaId: string;
  feedback: string;
}

export function useRejectIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ideaId, feedback }: RejectIdeaParams) => {
      console.log(`🚀 [useRejectIdea] Rejecting idea: ${ideaId}`);
      await adminIdeasService.rejectIdea(ideaId, feedback);
      return { success: true, ideaId };
    },
    onSuccess: (_, { ideaId }) => {
      console.log(`✅ [useRejectIdea] Success for idea: ${ideaId}`);

      queryClient.invalidateQueries({ queryKey: ["admin-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pending-ideas"] });

      toast.success("Idea rejected successfully");
    },
    onError: (error: any) => {
      console.error(`❌ [useRejectIdea] Error:`, error);

      let errorMessage = "Failed to reject idea";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      if (errorMessage.includes("UNDER_REVIEW")) {
        errorMessage =
          "This idea is not pending review. It may have been already approved or rejected.";
      } else if (errorMessage.includes("Feedback")) {
        errorMessage = "Feedback is required to reject an idea.";
      }

      toast.error(errorMessage);
    },
  });
}
