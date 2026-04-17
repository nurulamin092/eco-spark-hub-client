"use client";

import { ImagePreview } from "./ImagePreview";
import { UploadedImage } from "../types/upload.types";
import { useDeleteImage } from "../hooks/useDeleteImage";

interface ImageGalleryProps {
  images: UploadedImage[];
  ideaId: string;
  onImageDeleted?: () => void;
}

export function ImageGallery({
  images,
  ideaId,
  onImageDeleted,
}: ImageGalleryProps) {
  const { mutateAsync: deleteImage, isPending } = useDeleteImage(ideaId);

  const handleDelete = async (publicId: string) => {
    await deleteImage({ publicId });
    onImageDeleted?.();
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {images.map((img) => (
        <ImagePreview
          key={img.publicId}
          src={img.secureUrl}
          alt="Idea image"
          onRemove={() => handleDelete(img.publicId)}
          isUploading={isPending}
        />
      ))}
    </div>
  );
}
