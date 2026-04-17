import { apiClient } from "./base";

export const categoryApi = {
  getAll: async () => {
    const response = await apiClient.get("/categories");
    return response.data;
  },
};
