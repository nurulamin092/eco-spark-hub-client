// ============ src/features/admin/services/adminIdeas.service.ts ============
import { apiClient } from "@/lib/api/base";

export const adminIdeasService = {
  approveIdea: async (ideaId: string): Promise<void> => {
    await apiClient.patch(`/admin/ideas/${ideaId}/approve`);
  },

  rejectIdea: async (ideaId: string, feedback: string): Promise<void> => {
    await apiClient.patch(`/admin/ideas/${ideaId}/reject`, { feedback });
  },

  bulkApprove: async (ideaIds: string[]): Promise<{ count: number }> => {
    const response = await apiClient.post("/admin/ideas/bulk/approve", {
      ids: ideaIds,
    });
    return response.data.data;
  },

  bulkReject: async (
    ideaIds: string[],
    feedback: string,
  ): Promise<{ count: number }> => {
    const response = await apiClient.post("/admin/ideas/bulk/reject", {
      ids: ideaIds,
      feedback,
    });
    return response.data.data;
  },
};
