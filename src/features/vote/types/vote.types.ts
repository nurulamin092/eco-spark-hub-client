export type VoteType = "UP" | "DOWN";

export interface VotePayload {
  ideaId: string;
  type: VoteType;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    voteCounts: {
      upvotes: number;
      downvotes: number;
    };
  };
}

export interface UserVoteResponse {
  success: boolean;
  message: string;
  data: {
    idea: {
      id: string;
      title: string;
      status: string;
    };
    vote: {
      hasVoted: boolean;
      type: VoteType | null;
      votedAt: string | null;
    };
  };
}

export interface VoteStats {
  upvotes: number;
  downvotes: number;
  netVotes: number;
  userVote: VoteType | null;
}
