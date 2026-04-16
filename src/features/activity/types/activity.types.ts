export type ActivityType = "IDEA_CREATED" | "COMMENT_ADDED" | "VOTE_CAST";

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  data: {
    ideaId?: string;
    title?: string;
    commentId?: string;
    action?: string;
    voteType?: string;
  } | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ActivitiesResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: Activity[];
  };
}

export interface ActivityFilters {
  page?: number;
  limit?: number;
  type?: ActivityType;
  userId?: string;
}
