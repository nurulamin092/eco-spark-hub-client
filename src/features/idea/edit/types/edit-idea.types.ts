import { Idea } from "../../shared/types/idea.types";

export interface EditIdeaPayload {
  title?: string;
  problem?: string;
  solution?: string;
  description?: string;
  categoryId?: string;
  isPaid?: boolean;
  price?: number | null;
}

export interface EditIdeaResponse {
  success: boolean;
  message: string;
  data: Idea;
}

export interface IdeaForEditResponse {
  success: boolean;
  message: string;
  data: Idea;
}
