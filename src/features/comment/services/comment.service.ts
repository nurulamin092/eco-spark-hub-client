// ============ src/features/comment/services/comment.service.ts ============
import { apiClient } from "@/lib/api/base";
import {
  CreateCommentPayload,
  UpdateCommentPayload,
  Comment,
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "../types/comment.types";

function isSuccessResponse<T>(
  response: unknown,
): response is ApiSuccessResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    (response as { success: unknown }).success === true
  );
}

export const commentService = {
  getByIdea: async (ideaId: string): Promise<Comment[]> => {
    const { data } = await apiClient.get("/comments", { params: { ideaId } });

    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.comments && Array.isArray(data.comments)) return data.comments;

    return [];
  },

  create: async (payload: CreateCommentPayload): Promise<Comment> => {
    const { data } = await apiClient.post<ApiResponse<Comment>>(
      "/comments",
      payload,
    );

    if (isSuccessResponse(data)) {
      return data.data;
    }

    throw new Error(
      (data as ApiErrorResponse)?.message || "Failed to create comment",
    );
  },

  update: async (
    id: string,
    payload: UpdateCommentPayload,
  ): Promise<Comment> => {
    const { data } = await apiClient.patch<ApiResponse<Comment>>(
      `/comments/${id}`,
      payload,
    );

    if (isSuccessResponse(data)) {
      return data.data;
    }

    throw new Error(
      (data as ApiErrorResponse)?.message || "Failed to update comment",
    );
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/comments/${id}`);
  },

  hardDelete: async (id: string, reason?: string): Promise<void> => {
    await apiClient.delete(`/comments/${id}/permanent`, { data: { reason } });
  },
};
