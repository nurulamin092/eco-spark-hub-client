"use client";

import { useCallback, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { useUploadImages } from "../hooks/useUploadImages";
import { toast } from "sonner";
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_FILES } from "../constants";

interface ImageUploaderProps {
  ideaId: string;
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  disabled?: boolean;
}

export function ImageUploader({
  ideaId,
  onUploadComplete,
  maxFiles = MAX_FILES,
  disabled = false,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadImages } = useUploadImages(ideaId);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []);
      if (files.length + selected.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Filter valid types and sizes
      const validFiles = selected.filter((file) => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          toast.error(`${file.name} has unsupported format`);
          return false;
        }
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} exceeds 5MB limit`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);

      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [files.length, maxFiles],
  );

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    if (!ideaId) {
      toast.error("Idea ID is missing – please save the idea first");
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadImages(files);
      const urls = result.uploaded.map((img) => img.secureUrl);
      onUploadComplete?.(urls);

      // Clear state
      setFiles([]);
      setPreviews([]);
      toast.success(`${result.uploaded.length} images uploaded successfully`);
    } catch {
      // Error already handled by mutation
    } finally {
      setIsUploading(false);
    }
  }, [files, ideaId, uploadImages, onUploadComplete]);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]); // Cleanup
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const isPending = isUploading || disabled;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isPending
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-primary/50 cursor-pointer"
        }`}
        onClick={() => !isPending && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
          disabled={isPending}
          className="hidden"
        />
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm font-medium">
          {isPending ? "Uploading..." : "Click or drag to upload images"}
        </p>
        <p className="text-xs text-muted-foreground">
          {ALLOWED_IMAGE_TYPES.map((t) =>
            t.replace("image/", "").toUpperCase(),
          ).join(", ")}{" "}
          • Max {MAX_FILES} files • 5MB each
        </p>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((url, index) => (
            <div
              key={url}
              className="relative w-20 h-20 rounded-md border overflow-hidden group bg-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                className="absolute top-1 right-1 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/80"
                disabled={isPending}
              >
                <X className="h-4 w-4" />
              </button>
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {files.length > 0 && (
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            disabled={isPending}
          >
            Clear all
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleUpload}
            disabled={isPending || files.length === 0}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload {files.length} file{files.length > 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
