import { Idea } from "../../shared/types/idea.types";

export type IdeaStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface MyIdeasFilters {
  page?: number;
  limit?: number;
  status?: IdeaStatus;
  search?: string;
}

export interface MyIdeasResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Idea[];
  };
}

export interface DeleteIdeaResponse {
  success: boolean;
  message: string;
}

export interface SubmitIdeaResponse {
  success: boolean;
  message: string;
  data: Idea;
}
