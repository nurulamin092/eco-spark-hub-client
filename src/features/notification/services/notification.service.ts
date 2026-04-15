import { apiClient } from "@/lib/api/base";
import {
  NotificationsResponse,
  MarkAsReadResponse,
  MarkAllAsReadResponse,
} from "../types/notification.types";

export const notificationService = {
  getMyNotifications: async (): Promise<NotificationsResponse> => {
    const response = await apiClient.get("/notifications/me");
    return response.data;
  },

  markAsRead: async (notificationId: string): Promise<MarkAsReadResponse> => {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`,
    );
    return response.data;
  },

  markAllAsRead: async (): Promise<MarkAllAsReadResponse> => {
    const response = await apiClient.patch("/notifications/read-all");
    return response.data;
  },
};
