import { Idea } from "../../idea/shared/types/idea.types";

export interface Bookmark {
  id: string;
  userId: string;
  ideaId: string;
  createdAt: string;
  idea: Idea;
}

export interface BookmarkResponse {
  success: boolean;
  message: string;
  data: {
    bookmarked: boolean;
  };
}

export interface BookmarksResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Bookmark[];
  };
}

export interface ToggleBookmarkPayload {
  ideaId: string;
}
