import { Idea } from "../../shared/types/idea.types";

export interface IdeaDetailsProps {
  ideaId: string;
}

export interface IdeaDetailsResponse {
  success: boolean;
  message: string;
  data: Idea;
}
