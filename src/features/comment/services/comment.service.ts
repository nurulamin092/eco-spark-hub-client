// ============ src/features/comment/services/comment.service.ts ============
import { apiClient } from "@/lib/api/base";
import {
  CreateCommentPayload,
  UpdateCommentPayload,
  Comment,
} from "../types/comment.types";

export const commentService = {
  getByIdea: async (ideaId: string): Promise<Comment[]> => {
    try {
      const response = await apiClient.get("/comments", {
        params: { ideaId },
      });

      console.log("Raw API Response:", response.data);

      const responseData = response.data;

      let comments: Comment[] = [];

      if (responseData?.data?.data && Array.isArray(responseData.data.data)) {
        comments = responseData.data.data;
      } else if (responseData?.data && Array.isArray(responseData.data)) {
        comments = responseData.data;
      } else if (Array.isArray(responseData)) {
        comments = responseData;
      }

      console.log("Extracted comments:", comments);
      console.log("First comment replies:", comments[0]?.replies);
      console.log("Replies count:", comments[0]?.replies?.length);

      return comments;
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      return [];
    }
  },

  create: async (payload: CreateCommentPayload): Promise<Comment> => {
    const response = await apiClient.post("/comments", payload);

    return response.data?.data || response.data;
  },

  update: async (
    id: string,
    payload: UpdateCommentPayload,
  ): Promise<Comment> => {
    const response = await apiClient.patch(`/comments/${id}`, payload);
    return response.data?.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/comments/${id}`);
  },

  hardDelete: async (id: string, reason?: string): Promise<void> => {
    await apiClient.delete(`/comments/${id}/permanent`, { data: { reason } });
  },
};
