import { apiClient } from "@/lib/api/base";
import { VoteResponse, UserVoteResponse } from "../types/vote.types";

export const voteService = {
  vote: async (ideaId: string, type: "UP" | "DOWN"): Promise<VoteResponse> => {
    const response = await apiClient.post("/votes", { ideaId, type });
    return response.data;
  },

  removeVote: async (ideaId: string): Promise<VoteResponse> => {
    const response = await apiClient.delete(`/votes/${ideaId}`);
    return response.data;
  },

  getUserVote: async (ideaId: string): Promise<UserVoteResponse> => {
    const response = await apiClient.get(`/votes/${ideaId}`);
    return response.data;
  },

  getMyVotes: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get("/votes/me/all", { params });
    return response.data;
  },
};
