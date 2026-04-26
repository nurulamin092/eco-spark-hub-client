// ============ src/features/admin/hooks/mutations/useApproveIdea.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminIdeasService } from "../../services/adminIdeas.service";

export function useApproveIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ideaId: string) => adminIdeasService.approveIdea(ideaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pending-ideas"] });
      toast.success("Idea approved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve idea");
    },
  });
}
