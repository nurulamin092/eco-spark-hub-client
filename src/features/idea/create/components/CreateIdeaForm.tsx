// src/features/idea/create/components/CreateIdeaForm.tsx

"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ImageIcon, Info, X } from "lucide-react";
import Link from "next/link";
import { IdeaFormFields } from "./IdeaFormFields";
import { ImageUploader } from "@/features/upload";
import { useCreateIdeaForm } from "../hooks/useCreateIdeaForm";
import { useCreateIdea } from "../hooks/useCreateIdea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export function CreateIdeaForm() {
  const {
    form,
    isPending,
    serverError,
    categories,
    isLoadingCategories,
    uploadedImages,
    setUploadedImages,
    isUploading,
  } = useCreateIdeaForm();

  const { mutateAsync: createIdea, isPending: mutationIsPending } =
    useCreateIdea();

  // 🆕 State to store created idea ID
  const [createdIdeaId, setCreatedIdeaId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUploadComplete = useCallback(
    (urls: string[]) => {
      console.log("📸 Images uploaded:", urls);
      setUploadedImages((prev) => [...prev, ...urls]);
    },
    [setUploadedImages],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    },
    [setUploadedImages],
  );

  // 🆕 Custom submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        setIsSubmitting(true);

        // Validate form
        const errors = await form.validate("submit");
        if (Object.keys(errors).length > 0) {
          toast.error("Please fix the validation errors.");
          return;
        }

        const values = form.state.values;
        const result = await createIdea(values);

        if (result?.id) {
          setCreatedIdeaId(result.id);
          toast.success("Idea created! Now you can upload images.");
        }
      } catch (error) {
        console.error("Create idea error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, createIdea],
  );

  if (isLoadingCategories) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardContent className="py-10">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="text-center text-muted-foreground mt-2">
            Loading categories...
          </p>
        </CardContent>
      </Card>
    );
  }

  const isPendingOrSubmitting = isPending || isSubmitting || mutationIsPending;

  return (
    <TooltipProvider>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">
            Share Your Sustainability Idea
          </CardTitle>
          <CardDescription>
            Help the community by sharing your idea. All ideas are reviewed by
            admins before being published.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <form.Field name="title">
              {(field) => (
                <IdeaFormFields
                  field={field}
                  label="Title"
                  placeholder="Enter a catchy title (e.g., 'Community Solar Power Initiative')"
                  disabled={isPendingOrSubmitting}
                  required
                />
              )}
            </form.Field>

            {/* Category */}
            <form.Field name="categoryId">
              {(field) => (
                <div className="space-y-2">
                  <IdeaFormFields
                    field={field}
                    label="Category"
                    type="select"
                    options={categories}
                    disabled={isPendingOrSubmitting || categories.length === 0}
                    required
                  />
                  {categories.length === 0 && (
                    <p className="text-xs text-amber-600">
                      No categories available. Please contact admin.
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Problem Statement */}
            <form.Field name="problem">
              {(field) => (
                <IdeaFormFields
                  field={field}
                  label="Problem Statement"
                  type="textarea"
                  placeholder="What environmental problem does this address?"
                  rows={4}
                  disabled={isPendingOrSubmitting}
                  required
                />
              )}
            </form.Field>

            {/* Solution */}
            <form.Field name="solution">
              {(field) => (
                <IdeaFormFields
                  field={field}
                  label="Proposed Solution"
                  type="textarea"
                  placeholder="How does your idea solve this problem?"
                  rows={4}
                  disabled={isPendingOrSubmitting}
                  required
                />
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <IdeaFormFields
                  field={field}
                  label="Detailed Description"
                  type="textarea"
                  placeholder="Provide implementation details, resources needed, expected impact..."
                  rows={6}
                  disabled={isPendingOrSubmitting}
                  required
                />
              )}
            </form.Field>

            {/* Image Upload Section */}
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <label className="text-sm font-medium">
                    Supporting Images
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Upload images that support your idea (diagrams, mockups,
                        examples)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-xs text-muted-foreground">
                  {uploadedImages.length}/10 uploaded
                </span>
              </div>

              {/* ✅ Fix: Pass ideaId only if it exists */}
              {createdIdeaId ? (
                <ImageUploader
                  ideaId={createdIdeaId}
                  onUploadComplete={handleImageUploadComplete}
                  maxFiles={10}
                  disabled={isPending || isUploading}
                />
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/30 text-muted-foreground">
                  <p className="text-sm">
                    Create the idea first to enable image upload
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Upload up to 10 images. Supported: JPEG, PNG, WEBP, GIF. Max 5MB
                each.
              </p>

              {uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedImages.map((url, idx) => (
                    <div key={`${url}-${idx}`} className="relative group">
                      <div className="relative w-16 h-16 rounded-md border overflow-hidden bg-muted">
                        <Image
                          src={url}
                          alt={`Upload ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized={url.startsWith("data:")}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/80 transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Content Toggle */}
            <form.Field name="isPaid">
              {(field) => {
                const isPaidValue = field.state.value;
                return (
                  <div className="border-t pt-4 space-y-3">
                    <IdeaFormFields
                      field={field}
                      label="Premium Content"
                      type="switch"
                      disabled={isPendingOrSubmitting}
                    />

                    {isPaidValue && (
                      <>
                        <div className="bg-muted/30 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground">
                            <strong>Premium Idea:</strong> Other users must pay
                            to view this idea. You will earn 80% of each sale.
                          </p>
                        </div>

                        <form.Field name="price">
                          {(priceField) => (
                            <div className="space-y-2">
                              <IdeaFormFields
                                field={priceField}
                                label="Price (USD)"
                                type="number"
                                placeholder="Enter price (min $0.50)"
                                disabled={isPendingOrSubmitting}
                                required={true}
                              />
                              {priceField.state.value &&
                                priceField.state.value >= 0.5 && (
                                  <p className="text-xs text-green-600">
                                    💰 You will earn $
                                    {(
                                      (priceField.state.value * 80) /
                                      100
                                    ).toFixed(2)}{" "}
                                    per sale
                                  </p>
                                )}
                            </div>
                          )}
                        </form.Field>
                      </>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Server Error */}
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setUploadedImages([]);
                  setCreatedIdeaId(null);
                }}
                disabled={isPendingOrSubmitting}
              >
                Reset Form
              </Button>

              <Button
                type="submit"
                disabled={isPendingOrSubmitting}
                className="flex-1"
              >
                {isPendingOrSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Idea...
                  </>
                ) : (
                  "Create Idea"
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="border-t pt-6 flex justify-between">
          <Link
            href="/member/ideas"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Ideas
          </Link>
          <p className="text-xs text-muted-foreground">
            Your idea will be reviewed before publishing
          </p>
        </CardFooter>
      </Card>
    </TooltipProvider> 
  );
}
