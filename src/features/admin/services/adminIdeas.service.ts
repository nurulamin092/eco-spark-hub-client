import { apiClient } from "@/lib/api/base";
import {
  ApproveIdeaResponse,
  RejectIdeaResponse,
  BulkActionResponse,
} from "../types/admin.types";

export const adminIdeasService = {
  approveIdea: async (ideaId: string): Promise<ApproveIdeaResponse> => {
    const response = await apiClient.patch(`/ideas/${ideaId}/approve`);
    return response.data;
  },

  rejectIdea: async (
    ideaId: string,
    feedback: string,
  ): Promise<RejectIdeaResponse> => {
    const response = await apiClient.patch(`/ideas/${ideaId}/reject`, {
      feedback,
    });
    return response.data;
  },

  bulkApprove: async (ideaIds: string[]): Promise<BulkActionResponse> => {
    const response = await apiClient.post("/admin/ideas/bulk/approve", {
      ids: ideaIds,
    });
    return response.data;
  },

  bulkReject: async (
    ideaIds: string[],
    feedback: string,
  ): Promise<BulkActionResponse> => {
    const response = await apiClient.post("/admin/ideas/bulk/reject", {
      ids: ideaIds,
      feedback,
    });
    return response.data;
  },
  getPendingIdeas: async () => {
    const response = await apiClient.get("/admin/ideas/pending");
    return response.data;
  },
  getTopIdeas: async (params?: { limit?: number }) => {
    const response = await apiClient.get("/admin/ideas/top", { params });
    return response.data;
  },
};
