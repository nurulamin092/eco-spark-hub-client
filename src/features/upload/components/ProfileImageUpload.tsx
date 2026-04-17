"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUploadProfileImage } from "../hooks/useUploadProfileImage";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  UPLOAD_ERRORS,
} from "../constants";
import { toast } from "sonner";

export function ProfileImageUpload() {
  const { user, refetch } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUploadProfileImage();

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error(UPLOAD_ERRORS.INVALID_TYPE);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(UPLOAD_ERRORS.FILE_TOO_LARGE);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      setIsUploading(true);

      try {
        await mutateAsync(file);
        await refetch();
        toast.success("Profile picture updated successfully");
        setPreviewUrl(null);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed");
        setPreviewUrl(null);
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [mutateAsync, refetch],
  );

  const avatarUrl = previewUrl || user?.image || undefined;
  const initials = user?.name?.charAt(0).toUpperCase() || "U";
  const isLoading = isUploading;

  return (
    <div className="relative inline-block">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isLoading}
      />
    </div>
  );
}
