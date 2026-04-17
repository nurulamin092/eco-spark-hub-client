/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { voteService } from "../services/vote.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { VoteType } from "../types/vote.types";

export function useVote(ideaId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: vote, isPending: isVoting } = useMutation({
    mutationFn: async (type: VoteType) => {
      const response = await voteService.vote(ideaId, type);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.votes.userVote(ideaId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() });

      toast.success(data.message);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to vote";
      toast.error(errorMessage);
    },
  });

  const { mutateAsync: removeVote, isPending: isRemoving } = useMutation({
    mutationFn: async () => {
      const response = await voteService.removeVote(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ideas.detail(ideaId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.votes.userVote(ideaId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas.list() });

      toast.success(data.message);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove vote";
      toast.error(errorMessage);
    },
  });

  return {
    vote,
    removeVote,
    isVoting: isVoting || isRemoving,
  };
}
