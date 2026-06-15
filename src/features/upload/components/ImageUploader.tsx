// "use client";

// import { useRef, useCallback, useState } from "react";
// import { Upload, X, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useUploadImages } from "../hooks/useUploadImages";
// import { ImagePreview } from "./ImagePreview";
// import {
//   ALLOWED_IMAGE_TYPES,
//   MAX_FILE_SIZE,
//   MAX_FILES,
//   UPLOAD_ERRORS,
// } from "../constants";
// import { toast } from "sonner";

// interface ImageUploaderProps {
//   ideaId: string;
//   onUploadComplete?: (urls: string[]) => void;
//   maxFiles?: number;
// }

// export function ImageUploader({
//   ideaId,
//   onUploadComplete,
//   maxFiles = MAX_FILES,
// }: ImageUploaderProps) {
//   const [previews, setPreviews] = useState<{ file: File; preview: string }[]>(
//     [],
//   );
//   const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { mutateAsync: uploadImages, isPending } = useUploadImages(ideaId);

//   const validateFile = useCallback((file: File): string | null => {
//     if (!ALLOWED_IMAGE_TYPES.includes(file.type))
//       return UPLOAD_ERRORS.INVALID_TYPE;
//     if (file.size > MAX_FILE_SIZE) return UPLOAD_ERRORS.FILE_TOO_LARGE;
//     return null;
//   }, []);

//   const handleFileSelect = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const files = Array.from(e.target.files || []);
//       if (previews.length + files.length > maxFiles) {
//         toast.error(UPLOAD_ERRORS.TOO_MANY_FILES);
//         return;
//       }

//       const newPreviews: { file: File; preview: string }[] = [];
//       for (const file of files) {
//         const error = validateFile(file);
//         if (error) {
//           toast.error(error);
//           continue;
//         }
//         newPreviews.push({ file, preview: URL.createObjectURL(file) });
//       }
//       setPreviews((prev) => [...prev, ...newPreviews]);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     },
//     [previews.length, maxFiles, validateFile],
//   );

//   const removePreview = useCallback(
//     (index: number) => {
//       const preview = previews[index];
//       URL.revokeObjectURL(preview.preview);
//       setPreviews((prev) => prev.filter((_, i) => i !== index));
//     },
//     [previews],
//   );

//   const handleUpload = useCallback(async () => {
//     if (previews.length === 0) return;
//     const filesToUpload = previews.map((p) => p.file);
//     setUploadingFiles(new Set(filesToUpload.map((f) => f.name)));
//     try {
//       await uploadImages(filesToUpload);
//       previews.forEach((p) => URL.revokeObjectURL(p.preview));
//       setPreviews([]);
//       onUploadComplete?.();
//     } finally {
//       setUploadingFiles(new Set());
//     }
//   }, [previews, uploadImages, onUploadComplete]);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-3">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => fileInputRef.current?.click()}
//           disabled={isPending}
//         >
//           <Upload className="h-4 w-4 mr-2" />
//           <X className="h-3 w-3" />
//           Select Images
//         </Button>
//         {previews.length > 0 && (
//           <Button onClick={handleUpload} disabled={isPending}>
//             {isPending ? (
//               <Loader2 className="h-4 w-4 animate-spin mr-2" />
//             ) : null}
//             Upload {previews.length} Image{previews.length !== 1 ? "s" : ""}
//           </Button>
//         )}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/jpeg,image/png,image/webp,image/gif"
//           multiple
//           className="hidden"
//           onChange={handleFileSelect}
//           disabled={isPending}
//         />
//       </div>

//       {previews.length > 0 && (
//         <div className="flex flex-wrap gap-3 p-3 border rounded-lg bg-muted/20">
//           <div className="text-sm text-muted-foreground w-full mb-2">
//             Preview ({previews.length})
//           </div>
//           {previews.map((preview, idx) => (
//             <ImagePreview
//               key={idx}
//               src={preview.preview}
//               alt="Preview"
//               onRemove={() => removePreview(idx)}
//               isUploading={uploadingFiles.has(preview.file.name)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  disabled?: boolean;
}

export function ImageUploader({
  onUploadComplete,
  disabled = false,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      setIsUploading(true);

      try {
        // Your upload logic here
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("images", file);
        });

        // API call to upload
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const urls = data.urls || [];

        setUploadedUrls((prev) => [...prev, ...urls]);

        // ✅ Call callback with urls
        if (onUploadComplete) {
          onUploadComplete(urls);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadComplete],
  );

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        disabled={disabled || isUploading}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/jpeg,image/png,image/webp,image/gif";
          input.multiple = true;
          input.onchange = (e) =>
            handleUpload((e.target as HTMLInputElement).files);
          input.click();
        }}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
          </>
        )}
      </Button>

      {uploadedUrls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {uploadedUrls.map((url, idx) => (
            <div key={idx} className="relative w-16 h-16">
              <Image
                src={url}
                alt={`Upload ${idx + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
