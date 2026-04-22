// ============ src/features/category/shared/services/category.service.ts ============
import { apiClient } from "@/lib/api/base";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  ApiResponse,
} from "../types/category.types";

class CategoryService {
  private static instance: CategoryService;

  private constructor() {}

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async getAll(): Promise<Category[]> {
    console.log("📡 [categoryService] GET /categories");
    const response =
      await apiClient.get<ApiResponse<Category[]>>("/categories");
    console.log("📡 [categoryService] Response:", response.data);
    return response.data.data;
  }

  async getById(id: string): Promise<Category> {
    console.log(`📡 [categoryService] GET /categories/${id}`);
    // ✅ Make sure URL is correct - no double /api/v1
    const response = await apiClient.get<ApiResponse<Category>>(
      `/categories/${id}`,
    );
    console.log("📡 [categoryService] Response status:", response.status);
    console.log("📡 [categoryService] Response data:", response.data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to fetch category");
    }

    return response.data.data;
  }

  async create(payload: CreateCategoryPayload): Promise<ApiResponse<Category>> {
    const response = await apiClient.post<ApiResponse<Category>>(
      "/categories",
      payload,
    );
    return response.data;
  }
  async update(id: string, payload: UpdateCategoryPayload): Promise<Category> {
    console.log(`📡 [categoryService] PATCH /categories/${id}`, payload);
    const response = await apiClient.patch<ApiResponse<Category>>(
      `/categories/${id}`,
      payload,
    );
    console.log("📡 [categoryService] Update response:", response.data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to update category");
    }

    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  }
}

export const categoryService = CategoryService.getInstance();
