"use client";

import { useRef, useCallback, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadImages } from "../hooks/useUploadImages";
import { ImagePreview } from "./ImagePreview";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILES,
  UPLOAD_ERRORS,
} from "../constants";
import { toast } from "sonner";

interface ImageUploaderProps {
  ideaId: string;
  onUploadComplete?: () => void;
  maxFiles?: number;
}

export function ImageUploader({
  ideaId,
  onUploadComplete,
  maxFiles = MAX_FILES,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>(
    [],
  );
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImages, isPending } = useUploadImages(ideaId);

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type))
      return UPLOAD_ERRORS.INVALID_TYPE;
    if (file.size > MAX_FILE_SIZE) return UPLOAD_ERRORS.FILE_TOO_LARGE;
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (previews.length + files.length > maxFiles) {
        toast.error(UPLOAD_ERRORS.TOO_MANY_FILES);
        return;
      }

      const newPreviews: { file: File; preview: string }[] = [];
      for (const file of files) {
        const error = validateFile(file);
        if (error) {
          toast.error(error);
          continue;
        }
        newPreviews.push({ file, preview: URL.createObjectURL(file) });
      }
      setPreviews((prev) => [...prev, ...newPreviews]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [previews.length, maxFiles, validateFile],
  );

  const removePreview = useCallback(
    (index: number) => {
      const preview = previews[index];
      URL.revokeObjectURL(preview.preview);
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    },
    [previews],
  );

  const handleUpload = useCallback(async () => {
    if (previews.length === 0) return;
    const filesToUpload = previews.map((p) => p.file);
    setUploadingFiles(new Set(filesToUpload.map((f) => f.name)));
    try {
      await uploadImages(filesToUpload);
      previews.forEach((p) => URL.revokeObjectURL(p.preview));
      setPreviews([]);
      onUploadComplete?.();
    } finally {
      setUploadingFiles(new Set());
    }
  }, [previews, uploadImages, onUploadComplete]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
        >
          <Upload className="h-4 w-4 mr-2" />
          <X className="h-3 w-3" />
          Select Images
        </Button>
        {previews.length > 0 && (
          <Button onClick={handleUpload} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Upload {previews.length} Image{previews.length !== 1 ? "s" : ""}
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          disabled={isPending}
        />
      </div>

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3 p-3 border rounded-lg bg-muted/20">
          <div className="text-sm text-muted-foreground w-full mb-2">
            Preview ({previews.length})
          </div>
          {previews.map((preview, idx) => (
            <ImagePreview
              key={idx}
              src={preview.preview}
              alt="Preview"
              onRemove={() => removePreview(idx)}
              isUploading={uploadingFiles.has(preview.file.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
