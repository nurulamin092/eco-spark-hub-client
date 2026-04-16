import { apiClient } from "@/lib/api/base";
import {
  BlogFilters,
  BlogsResponse,
  BlogResponse,
  CommentsResponse,
  CreateCommentPayload,
  UpdateBlogPayload,
  CreateBlogPayload,
} from "../types/blog.types";

export const blogService = {
  getAll: async (filters?: BlogFilters): Promise<BlogsResponse> => {
    const response = await apiClient.get("/blogs", { params: filters });
    return response.data;
  },

  getBySlug: async (slug: string): Promise<BlogResponse> => {
    const response = await apiClient.get(`/blogs/${slug}`);
    return response.data;
  },

  getRelated: async (id: string, limit: number = 3): Promise<BlogsResponse> => {
    const response = await apiClient.get(`/blogs/${id}/related`, {
      params: { limit },
    });
    return response.data;
  },

  create: async (payload: CreateBlogPayload): Promise<BlogResponse> => {
    const response = await apiClient.post("/blogs", payload);
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateBlogPayload,
  ): Promise<BlogResponse> => {
    const response = await apiClient.patch(`/blogs/${id}`, payload);
    return response.data;
  },

  delete: async (id: string): Promise<BlogResponse> => {
    const response = await apiClient.delete(`/blogs/${id}`);
    return response.data;
  },

  publish: async (id: string): Promise<BlogResponse> => {
    const response = await apiClient.patch(`/blogs/${id}/publish`);
    return response.data;
  },

  getComments: async (
    blogId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<CommentsResponse> => {
    const response = await apiClient.get(`/blogs/${blogId}/comments`, {
      params: { page, limit },
    });
    return response.data;
  },

  createComment: async (
    payload: CreateCommentPayload,
  ): Promise<{ success: boolean; message: string; data: unknown }> => {
    const response = await apiClient.post("/blogs/comments", payload);
    return response.data;
  },

  deleteComment: async (
    commentId: string,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/blogs/comments/${commentId}`);
    return response.data;
  },

  toggleLike: async (
    blogId: string,
  ): Promise<{
    success: boolean;
    message: string;
    data: { liked: boolean };
  }> => {
    const response = await apiClient.post(`/blogs/${blogId}/like`);
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get("/blogs/categories/all");
    return response.data;
  },

  getTags: async () => {
    const response = await apiClient.get("/blogs/tags/all");
    return response.data;
  },
};
