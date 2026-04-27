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
      await adminIdeasService.rejectIdea(ideaId, feedback);
      return { success: true };
    },
    onSuccess: (_, { ideaId }) => {
      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pending-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "idea", ideaId] });
      queryClient.invalidateQueries({ queryKey: ["ideas", "list"] });
      queryClient.invalidateQueries({ queryKey: ["ideas", "detail", ideaId] });

      toast.success("Idea rejected successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to reject idea";
      toast.error(errorMessage);
    },
  });
}
