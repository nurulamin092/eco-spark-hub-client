import { apiClient } from "@/lib/api/base";
import { BookmarkResponse, BookmarksResponse } from "../types/bookmark.types";

export const bookmarkService = {
  toggle: async (ideaId: string): Promise<BookmarkResponse> => {
    const response = await apiClient.post("/bookmarks", { ideaId });
    return response.data;
  },

  getMyBookmarks: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<BookmarksResponse> => {
    const response = await apiClient.get("/bookmarks/me", { params });
    return response.data;
  },

  isBookmarked: async (ideaId: string): Promise<boolean> => {
    const response = await apiClient.get(`/bookmarks/check/${ideaId}`);
    return response.data.data.bookmarked;
  },
};
