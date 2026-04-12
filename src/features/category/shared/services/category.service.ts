import { apiClient } from "@/lib/api/base";
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CategoriesResponse,
  CategoryResponse,
  DeleteCategoryResponse,
} from "../types/category.types";

export const categoryService = {
  getAll: async (): Promise<CategoriesResponse> => {
    const response = await apiClient.get("/categories");
    return response.data;
  },

  getById: async (id: string): Promise<CategoryResponse> => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  create: async (payload: CreateCategoryPayload): Promise<CategoryResponse> => {
    const response = await apiClient.post("/categories", payload);
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateCategoryPayload,
  ): Promise<CategoryResponse> => {
    const response = await apiClient.patch(`/categories/${id}`, payload);
    return response.data;
  },

  delete: async (id: string): Promise<DeleteCategoryResponse> => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};
