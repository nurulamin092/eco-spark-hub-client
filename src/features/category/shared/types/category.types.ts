// ============ src/features/category/shared/types/category.types.ts ============
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  isActive: boolean;
  isPredefined: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    ideas: number;
    blogs?: number;
  };
}

export interface CreateCategoryPayload {
  name: string;
  description?: string; // ✅ undefined allowed, not null
  icon?: string; // ✅ undefined allowed, not null
  color?: string; // ✅ undefined allowed, not null
}

export interface UpdateCategoryPayload {
  name?: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  isActive?: boolean;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface DeleteCategoryResponse {
  success: boolean;
  message: string;
}
