import { apiClient } from "@/lib/api/base";

export interface ApproveIdeaResponse {
  success: boolean;
  message: string;
  data: { id: string; status: string };
}

export interface RejectIdeaResponse {
  success: boolean;
  message: string;
  data: { id: string; status: string; adminFeedback: string };
}

export const adminIdeasService = {
  approveIdea: async (ideaId: string): Promise<ApproveIdeaResponse> => {
    const response = await apiClient.patch(`/admin/ideas/${ideaId}/approve`);
    return response.data;
  },

  rejectIdea: async (
    ideaId: string,
    feedback: string,
  ): Promise<RejectIdeaResponse> => {
    const response = await apiClient.patch(`/admin/ideas/${ideaId}/reject`, {
      feedback,
    });
    return response.data;
  },

  bulkApprove: async (
    ideaIds: string[],
  ): Promise<{
    success: boolean;
    message: string;
    data: { count: number };
  }> => {
    const response = await apiClient.post("/admin/ideas/bulk/approve", {
      ids: ideaIds,
    });
    return response.data;
  },

  bulkReject: async (
    ideaIds: string[],
    feedback: string,
  ): Promise<{
    success: boolean;
    message: string;
    data: { count: number };
  }> => {
    const response = await apiClient.post("/admin/ideas/bulk/reject", {
      ids: ideaIds,
      feedback,
    });
    return response.data;
  },
};
