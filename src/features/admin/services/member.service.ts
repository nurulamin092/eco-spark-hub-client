import { apiClient } from "@/lib/api/base";
import {
  BulkActionResponse,
  Member,
  MembersQueryParams,
  PaginatedMembers,
} from "../types/members.types";

export const memberService = {
  async getAllMembers(
    params: MembersQueryParams = {},
  ): Promise<PaginatedMembers> {
    const res = await apiClient.get("/admin/members", { params });
    return res.data.data;
  },

  async getMemberById(id: string): Promise<Member> {
    const res = await apiClient.get(`/admin/members/${id}`);
    return res.data.data;
  },

  // async activate(id: string) {
  //   await apiClient.patch(`/admin/members/${id}/activate`);
  // },

  // async deactivate(id: string) {
  //   await apiClient.patch(`/admin/members/${id}/deactivate`);
  // },

  async activateMember(memberId: string): Promise<void> {
    await apiClient.patch(`/admin/members/${memberId}/activate`);
  },

  async deactivateMember(memberId: string): Promise<void> {
    await apiClient.patch(`/admin/members/${memberId}/deactivate`);
  },

  async delete(id: string) {
    await apiClient.delete(`/admin/members/${id}`);
  },

  async bulkActivateMembers(ids: string[]): Promise<BulkActionResponse> {
    const response = await apiClient.post("/admin/members/bulk/activate", {
      ids,
    });
    return response.data.data;
  },

  async bulkDeactivateMembers(ids: string[]): Promise<BulkActionResponse> {
    const response = await apiClient.post("/admin/members/bulk/deactivate", {
      ids,
    });
    return response.data.data;
  },
};
