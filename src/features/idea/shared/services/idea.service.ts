// ============ src/features/idea/shared/services/idea.service.ts ============
import { apiClient } from "@/lib/api/base";
import type {
  CreateIdeaPayload,
  CreateIdeaResponse,
  UpdateIdeaPayload,
  IdeaFilters,
  IdeasResponse,
  Idea,
  Category,
  MyIdeasFilters,
  MyIdeasResponse,
  DeleteIdeaResponse,
  SubmitIdeaResponse,
  EditIdeaResponse,
  IdeaForEditResponse,
  RelatedIdea,
} from "../types/idea.types";

// ✅ Helper to transform frontend filters to backend params
export function transformFiltersToParams(
  filters?: IdeaFilters,
): Record<string, unknown> {
  const params: Record<string, unknown> = {};

  if (!filters) return params;

  // Pagination
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  // Search
  if (filters.search) params.search = filters.search;

  // ✅ Fix: Map 'category' to 'categoryId'
  if (filters.category) params.categoryId = filters.category;

  // Status
  if (filters.status) params.status = filters.status;

  // ✅ Fix: Transform sort values
  if (filters.sort) {
    switch (filters.sort) {
      case "recent":
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
        break;
      case "oldest":
        params.sortBy = "createdAt";
        params.sortOrder = "asc";
        break;
      case "popular":
      case "top":
        params.sortBy = "upvoteCount";
        params.sortOrder = "desc";
        break;
      case "commented":
        params.sortBy = "commentCount";
        params.sortOrder = "desc";
        break;
      case "trending":
        params.sort = "trending";
        break;
      default:
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
    }
  }

  return params;
}

// ✅ New helper for category filters (simpler type)
interface CategoryFilters {
  page?: number;
  limit?: number;
  sort?: string;
}

function transformCategoryFiltersToParams(
  filters?: CategoryFilters,
): Record<string, unknown> {
  const params: Record<string, unknown> = {};

  if (!filters) return params;

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  if (filters.sort) {
    switch (filters.sort) {
      case "recent":
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
        break;
      case "popular":
        params.sortBy = "upvoteCount";
        params.sortOrder = "desc";
        break;
      default:
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
    }
  }

  return params;
}

export const ideaService = {
  // Get all ideas (public)
  getAllIdeas: async (filters?: IdeaFilters): Promise<IdeasResponse> => {
    const params = transformFiltersToParams(filters);
    console.log("📡 [ideaService] GET /ideas with params:", params);

    const response = await apiClient.get("/ideas", { params });

    // ✅ Handle both response structures
    if (response.data?.data?.data) {
      return response.data;
    }
    if (response.data?.data) {
      return { ...response.data, data: response.data.data };
    }
    return response.data;
  },

  // Get single idea by ID
  getIdeaById: async (
    id: string,
  ): Promise<{ success: boolean; message: string; data: Idea }> => {
    const response = await apiClient.get(`/ideas/${id}`);
    return response.data;
  },

  getRelatedIdeas: async (
    ideaId: string,
    limit: number = 3,
  ): Promise<{ success: boolean; data: RelatedIdea[] }> => {
    const response = await apiClient.get(`/ideas/${ideaId}/related`, {
      params: { limit },
    });
    return response.data;
  },

  // Get idea for edit (checks ownership)
  getIdeaForEdit: async (id: string): Promise<IdeaForEditResponse> => {
    const response = await apiClient.get(`/ideas/${id}/edit`);
    return response.data;
  },

  // Create idea (draft)
  createIdea: async (
    payload: CreateIdeaPayload,
  ): Promise<CreateIdeaResponse> => {
    const response = await apiClient.post("/ideas", payload);
    return response.data;
  },

  // Update idea
  updateIdea: async (
    id: string,
    payload: UpdateIdeaPayload,
  ): Promise<EditIdeaResponse> => {
    const response = await apiClient.patch(`/ideas/${id}`, payload);
    return response.data;
  },

  // Delete idea
  deleteIdea: async (id: string): Promise<DeleteIdeaResponse> => {
    const response = await apiClient.delete(`/ideas/${id}`);
    return response.data;
  },

  // Submit idea for review
  submitIdea: async (id: string): Promise<SubmitIdeaResponse> => {
    const response = await apiClient.patch(`/ideas/${id}/submit`);
    return response.data;
  },

  // Get my ideas
  getMyIdeas: async (filters?: MyIdeasFilters): Promise<MyIdeasResponse> => {
    const params: Record<string, unknown> = {};
    if (filters?.page) params.page = filters.page;
    if (filters?.limit) params.limit = filters.limit;
    if (filters?.status) params.status = filters.status;
    if (filters?.search) params.search = filters.search;

    const response = await apiClient.get("/ideas/my-ideas", { params });
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

  // ✅ Fixed: Get ideas by category with proper typing
  getIdeasByCategory: async (
    categoryId: string,
    filters?: CategoryFilters,
  ): Promise<IdeasResponse> => {
    const params = transformCategoryFiltersToParams(filters);
    const response = await apiClient.get(`/ideas/category/${categoryId}`, {
      params,
    });
    return response.data;
  },

  // Get categories
  getCategories: async (): Promise<{ success: boolean; data: Category[] }> => {
    const response = await apiClient.get("/categories");
    return response.data;
  },
};

// ✅ Export types for external use
export type { CategoryFilters };
