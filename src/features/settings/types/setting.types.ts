export type SettingType = "STRING" | "NUMBER" | "BOOLEAN" | "JSON";

export interface Setting {
  id: string;
  key: string;
  value: unknown;
  type: SettingType;
  description: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSettingPayload {
  key: string;
  value: unknown;
  type: SettingType;
  description?: string;
  isPublic?: boolean;
}

export interface UpdateSettingPayload {
  value?: unknown;
  description?: string;
  isPublic?: boolean;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: Setting[];
}

export interface SettingResponse {
  success: boolean;
  message: string;
  data: Setting;
}
