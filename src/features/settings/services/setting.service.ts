import { apiClient } from "@/lib/api/base";
import {
  CreateSettingPayload,
  UpdateSettingPayload,
  SettingsResponse,
  SettingResponse,
} from "../types/setting.types";

export const settingService = {
  getPublic: async (): Promise<SettingsResponse> => {
    const response = await apiClient.get("/settings/public");
    return response.data;
  },

  getAll: async (): Promise<SettingsResponse> => {
    const response = await apiClient.get("/settings");
    return response.data;
  },

  getByKey: async (key: string): Promise<SettingResponse> => {
    const response = await apiClient.get(`/settings/${key}`);
    return response.data;
  },

  create: async (payload: CreateSettingPayload): Promise<SettingResponse> => {
    const response = await apiClient.post("/settings", payload);
    return response.data;
  },

  update: async (
    key: string,
    payload: UpdateSettingPayload,
  ): Promise<SettingResponse> => {
    const response = await apiClient.patch(`/settings/${key}`, payload);
    return response.data;
  },

  delete: async (
    key: string,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/settings/${key}`);
    return response.data;
  },
};
