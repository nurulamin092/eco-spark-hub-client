// ============ src/features/admin/hooks/mutations/useRejectIdea.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminIdeasService } from "../../services/adminIdeas.service";

export function useRejectIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ideaId, feedback }: { ideaId: string; feedback: string }) =>
      adminIdeasService.rejectIdea(ideaId, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pending-ideas"] });
      toast.success("Idea rejected");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject idea");
    },
  });
}
