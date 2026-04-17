import { apiClient } from "./base";

export interface Idea {
  id: string;
  title: string;
  slug: string;
  description: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  viewCount: number;
  isPaid: boolean;
  price?: number;
  author: { id: string; name: string; image: string | null };
  category: { id: string; name: string; color: string | null };
  createdAt: string;
}

export const ideaApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sort?: "recent" | "top" | "commented" | "trending";
  }) => {
    const response = await apiClient.get("/ideas", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/ideas/${id}`);
    return response.data;
  },

  getFeatured: async (limit: number = 3) => {
    const response = await apiClient.get("/ideas/featured", {
      params: { limit },
    });
    return response.data;
  },

  getTestimonials: async (limit: number = 3) => {
    const response = await apiClient.get("/ideas/testimonials", {
      params: { limit },
    });
    return response.data;
  },
};
