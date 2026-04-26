// ============ src/features/idea/edit/hooks/useUpdateIdea.ts ============
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import type { UpdateIdeaPayload } from "../../shared/types/idea.types";

export function useUpdateIdea(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateIdeaPayload) =>
      ideaService.updateIdea(ideaId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.myIdeas() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() });
    },
  });
}
