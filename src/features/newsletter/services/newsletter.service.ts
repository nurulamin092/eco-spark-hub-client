import { apiClient } from "@/lib/api/base";
import {
  NewsletterResponse,
  SubscribersResponse,
} from "../types/newsletter.types";

export const newsletterService = {
  subscribe: async (email: string): Promise<NewsletterResponse> => {
    const response = await apiClient.post("/newsletter/subscribe", { email });
    return response.data;
  },

  unsubscribe: async (email: string): Promise<NewsletterResponse> => {
    const response = await apiClient.post("/newsletter/unsubscribe", { email });
    return response.data;
  },

  getSubscribers: async (params?: {
    page?: number;
    limit?: number;
    isActive?: boolean;
  }): Promise<SubscribersResponse> => {
    const response = await apiClient.get("/newsletter", { params });
    return response.data;
  },
};
