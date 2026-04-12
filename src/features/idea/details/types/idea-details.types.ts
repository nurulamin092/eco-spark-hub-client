import { Idea } from "../../shared/types/idea.types";

export interface IdeaDetailsProps {
  ideaId: string;
}

export interface IdeaDetailsResponse {
  success: boolean;
  message: string;
  data: Idea;
}

export interface RelatedIdea {
  id: string;
  title: string;
  slug: string;
  upvoteCount: number;
  author: {
    name: string;
    image: string | null;
  };
}
