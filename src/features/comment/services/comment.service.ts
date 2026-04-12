import { apiClient } from "@/lib/api/base";
import {
  CreateCommentPayload,
  UpdateCommentPayload,
  CommentsResponse,
  CommentResponse,
  DeleteCommentResponse,
} from "../types/comment.types";

export const commentService = {
  getByIdea: async (ideaId: string): Promise<CommentsResponse> => {
    const response = await apiClient.get("/comments", { params: { ideaId } });
    return response.data;
  },

  create: async (payload: CreateCommentPayload): Promise<CommentResponse> => {
    const response = await apiClient.post("/comments", payload);
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateCommentPayload,
  ): Promise<CommentResponse> => {
    const response = await apiClient.patch(`/comments/${id}`, payload);
    return response.data;
  },

  delete: async (id: string): Promise<DeleteCommentResponse> => {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
  },

  hardDelete: async (
    id: string,
    reason?: string,
  ): Promise<DeleteCommentResponse> => {
    const response = await apiClient.delete(`/comments/${id}/permanent`, {
      data: { reason },
    });
    return response.data;
  },
};
