import { apiClient } from "@/lib/api/base";
import {
  CreateIdeaPayload,
  UpdateIdeaPayload,
  IdeaFilters,
  IdeasResponse,
  Idea,
  Category,
} from "../types/idea.types";
import {
  IdeaDetailsResponse,
  RelatedIdea,
} from "../../details/types/idea-details.types";

export const ideaService = {
  // Get all ideas (public)
  getAllIdeas: async (filters?: IdeaFilters): Promise<IdeasResponse> => {
    const response = await apiClient.get("/ideas", { params: filters });
    return response.data;
  },

  // Get single idea by ID
  getIdeaById: async (id: string): Promise<IdeaDetailsResponse> => {
    const response = await apiClient.get(`/ideas/${id}`);
    return response.data;
  },

  // Get related ideas
  getRelatedIdeas: async (
    ideaId: string,
    limit: number = 3,
  ): Promise<{ success: boolean; data: RelatedIdea[] }> => {
    const response = await apiClient.get(`/ideas/${ideaId}/related`, {
      params: { limit },
    });
    return response.data;
  },

  // Get idea by slug
  getIdeaBySlug: async (
    slug: string,
  ): Promise<{ success: boolean; message: string; data: Idea }> => {
    const response = await apiClient.get(`/ideas/slug/${slug}`);
    return response.data;
  },

  // Create idea (draft)
  createIdea: async (
    payload: CreateIdeaPayload,
  ): Promise<{ success: boolean; message: string; data: Idea }> => {
    const response = await apiClient.post("/ideas", payload);
    return response.data;
  },

  // Update idea
  updateIdea: async (
    id: string,
    payload: UpdateIdeaPayload,
  ): Promise<{ success: boolean; message: string; data: Idea }> => {
    const response = await apiClient.patch(`/ideas/${id}`, payload);
    return response.data;
  },

  // Delete idea
  deleteIdea: async (
    id: string,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/ideas/${id}`);
    return response.data;
  },

  // Submit idea for review
  submitIdea: async (
    id: string,
  ): Promise<{ success: boolean; message: string; data: Idea }> => {
    const response = await apiClient.patch(`/ideas/${id}/submit`);
    return response.data;
  },

  // Get my ideas
  getMyIdeas: async (filters?: {
    page?: number;
    limit?: number;
  }): Promise<IdeasResponse> => {
    const response = await apiClient.get("/ideas/my-ideas", {
      params: filters,
    });
    return response.data;
  },

  // Get featured ideas
  getFeaturedIdeas: async (
    limit?: number,
  ): Promise<{ success: boolean; message: string; data: Idea[] }> => {
    const response = await apiClient.get("/ideas/featured", {
      params: { limit },
    });
    return response.data;
  },

  // Get top voted ideas (testimonials)
  getTestimonials: async (
    limit?: number,
  ): Promise<{ success: boolean; message: string; data: Idea[] }> => {
    const response = await apiClient.get("/ideas/testimonials", {
      params: { limit },
    });
    return response.data;
  },

  // Get ideas by category
  getIdeasByCategory: async (
    categoryId: string,
    filters?: { page?: number; limit?: number },
  ): Promise<IdeasResponse> => {
    const response = await apiClient.get(`/ideas/category/${categoryId}`, {
      params: filters,
    });
    return response.data;
  },
  getCategories: async (): Promise<{ success: boolean; data: Category[] }> => {
    const response = await apiClient.get("/categories");
    return response.data;
  },
};
