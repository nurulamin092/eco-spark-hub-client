import { apiClient } from "@/lib/api/base";
import { Member, PaginatedMembers } from "../types/members.types";

export const memberService = {
  async getMembers(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedMembers> {
    const res = await apiClient.get("/admin/members", { params });
    return res.data.data;
  },

  async getMemberById(id: string): Promise<Member> {
    const res = await apiClient.get(`/admin/members/${id}`);
    return res.data.data;
  },

  async activate(id: string) {
    await apiClient.patch(`/admin/members/${id}/activate`);
  },

  async deactivate(id: string) {
    await apiClient.patch(`/admin/members/${id}/deactivate`);
  },

  async delete(id: string) {
    await apiClient.delete(`/admin/members/${id}`);
  },
};
