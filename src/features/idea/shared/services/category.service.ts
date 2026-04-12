import { apiClient } from "@/lib/api/base";

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  icon: string | null;
  description: string | null;
  isActive: boolean;
}

export const categoryService = {
  getAll: async (): Promise<{
    success: boolean;
    message: string;
    data: Category[];
  }> => {
    const response = await apiClient.get("/categories");
    return response.data;
  },
};
