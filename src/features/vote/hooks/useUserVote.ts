"use client";

import { useQuery } from "@tanstack/react-query";
import { voteService } from "../services/vote.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { VoteType } from "../types/vote.types";

interface UseUserVoteResult {
  hasVoted: boolean;
  userVote: VoteType | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUserVote(ideaId: string): UseUserVoteResult {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.votes.userVote(ideaId),
    queryFn: async () => {
      const response = await voteService.getUserVote(ideaId);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: !!ideaId,
    staleTime: 30 * 1000,
    retry: 1,
  });

  return {
    hasVoted: data?.vote?.hasVoted || false,
    userVote: data?.vote?.type || null,
    isLoading,
    error: error as Error | null,
  };
}
