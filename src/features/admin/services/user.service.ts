import { apiClient } from "@/lib/api/base";
import {
  User,
  UsersQueryParams,
  PaginatedUsers,
  UpdateUserRolePayload,
  BulkUserActionResponse,
} from "../types/users.types";

export const userService = {
  getAllUsers: async (
    params: UsersQueryParams = {},
  ): Promise<PaginatedUsers> => {
    const response = await apiClient.get("/admin/users", { params });
    return response.data.data;
  },

  updateUserRole: async (
    userId: string,
    payload: UpdateUserRolePayload,
  ): Promise<User> => {
    const response = await apiClient.patch(
      `/admin/users/${userId}/role`,
      payload,
    );
    return response.data.data;
  },

  activateUser: async (userId: string): Promise<User> => {
    const response = await apiClient.patch(`/admin/users/${userId}/activate`);
    return response.data.data;
  },

  deactivateUser: async (userId: string): Promise<User> => {
    const response = await apiClient.patch(`/admin/users/${userId}/deactivate`);
    return response.data.data;
  },

  bulkActivateUsers: async (ids: string[]): Promise<BulkUserActionResponse> => {
    const response = await apiClient.post("/admin/users/bulk/activate", {
      ids,
    });
    return response.data.data;
  },

  bulkDeactivateUsers: async (
    ids: string[],
  ): Promise<BulkUserActionResponse> => {
    const response = await apiClient.post("/admin/users/bulk/deactivate", {
      ids,
    });
    return response.data.data;
  },
};
