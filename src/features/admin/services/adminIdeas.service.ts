/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/features/admin/services/adminIdeas.service.ts ============
import { apiClient } from "@/lib/api/base";
import {
  AdminIdea,
  AdminIdeasFilters,
  PaginatedResponse,
} from "../types/admin.types";

export const adminIdeasService = {
  getAllIdeas: async (
    filters?: AdminIdeasFilters,
  ): Promise<PaginatedResponse<AdminIdea>> => {
    const params: Record<string, unknown> = {};
    if (filters?.page) params.page = filters.page;
    if (filters?.limit) params.limit = filters.limit;
    if (filters?.search) params.search = filters.search;
    if (filters?.status) params.status = filters.status;
    if (filters?.sortBy) params.sortBy = filters.sortBy;
    if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

    const response = await apiClient.get("/ideas/all", { params });
    return response.data.data;
  },

  getPendingIdeas: async (limit: number = 10): Promise<AdminIdea[]> => {
    const response = await apiClient.get(`/admin/ideas/pending?limit=${limit}`);
    return response.data;
  },
  getTopIdeas: async (limit: number = 10): Promise<AdminIdea[]> => {
    const response = await apiClient.get(`/admin/ideas/top?limit=${limit}`);
    return response.data.data;
  },

  approveIdea: async (ideaId: string): Promise<void> => {
    try {
      console.log(`📤 [approveIdea] Sending request for idea: ${ideaId}`);
      console.log(`📤 [approveIdea] URL: /ideas/${ideaId}/approve`);

      const response = await apiClient.patch(`/ideas/${ideaId}/approve`);

      console.log(`📥 [approveIdea] Response status: ${response.status}`);
      console.log(`📥 [approveIdea] Response data:`, response.data);

      if (response.status !== 200) {
        throw new Error(`Failed to approve idea: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error(`❌ [approveIdea] Error:`, {
        status: error.response?.status,
        message: error.response?.data?.message,
        data: error.response?.data,
      });
      throw error;
    }
  },

  rejectIdea: async (ideaId: string, feedback: string): Promise<void> => {
    try {
      console.log(`📤 Rejecting idea: ${ideaId}`);
      const response = await apiClient.patch(`/ideas/${ideaId}/reject`, {
        feedback,
      });
      console.log(`📥 Reject response status: ${response.status}`);

      if (response.status !== 200) {
        throw new Error(`Failed to reject idea: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Reject API error:", error);
      throw error;
    }
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
