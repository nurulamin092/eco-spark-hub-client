"use client";

import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove?: () => void;
  isUploading?: boolean;
}

export function ImagePreview({
  src,
  alt,
  onRemove,
  isUploading,
}: ImagePreviewProps) {
  return (
    <div className="relative group w-24 h-24 rounded-lg overflow-hidden border bg-muted">
      <Image src={src} alt={alt} fill className="object-cover" />
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
      )}
      {onRemove && !isUploading && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-1 right-1 h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
