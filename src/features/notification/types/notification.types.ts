/* eslint-disable @typescript-eslint/no-explicit-any */
export type NotificationType =
  | "IDEA_APPROVED"
  | "IDEA_REJECTED"
  | "COMMENT_REPLY"
  | "VOTE_RECEIVED"
  | "PAYMENT_SUCCESS"
  | "IDEA_REPORTED"
  | "NEWSLETTER";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: any;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
  data: Notification;
}

export interface MarkAllAsReadResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
  };
}