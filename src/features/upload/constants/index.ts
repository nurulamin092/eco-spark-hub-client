export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILES = 10;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/jpg",
];

export const UPLOAD_ERRORS = {
  NO_FILE: "No file selected",
  INVALID_TYPE: "Invalid file type. Only JPEG, PNG, WEBP, GIF are allowed",
  FILE_TOO_LARGE: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
  TOO_MANY_FILES: `Maximum ${MAX_FILES} files allowed`,
  UPLOAD_FAILED: "Upload failed. Please try again",
  DELETE_FAILED: "Failed to delete image",
} as const;
