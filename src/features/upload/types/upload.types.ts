export interface UploadedImage {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
  uploadedAt: string;
}

export interface UploadResult {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export interface MultipleUploadResult {
  success: UploadResult[];
  failed: { filename: string; error: string }[];
}

export interface UploadImagesResponse {
  success: boolean;
  message: string;
  data: {
    uploaded: UploadResult[];
    failed: { filename: string; error: string }[];
    totalImages: number;
  };
}

export interface DeleteImageResponse {
  success: boolean;
  message: string;
}

export interface UploadProfileImageResponse {
  success: boolean;
  message: string;
  data: {
    secureUrl: string;
  };
}
