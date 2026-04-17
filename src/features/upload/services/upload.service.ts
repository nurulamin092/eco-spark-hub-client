import { apiClient } from "@/lib/api/base";
import {
  UploadImagesResponse,
  DeleteImageResponse,
  UploadProfileImageResponse,
} from "../types/upload.types";

export const uploadService = {
  uploadIdeaImages: async (
    ideaId: string,
    files: File[],
  ): Promise<UploadImagesResponse> => {
    const formData = new FormData();
    formData.append("ideaId", ideaId);
    files.forEach((file) => formData.append("images", file));

    const response = await apiClient.post("/uploads/ideas/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteIdeaImage: async (
    ideaId: string,
    publicId: string,
  ): Promise<DeleteImageResponse> => {
    const response = await apiClient.delete(
      `/uploads/ideas/${ideaId}/images/${publicId}`,
    );
    return response.data;
  },

  uploadProfileImage: async (
    file: File,
  ): Promise<UploadProfileImageResponse> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post("/uploads/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
