/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/features/category/edit/components/EditCategoryForm.tsx ============
"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  useCategory,
  useUpdateCategory,
} from "../../shared/hooks/useCategories";

import type { UpdateCategoryPayload } from "../../shared/types/category.types";
import type { UpdateCategoryFormValues } from "../../shared/schemas/category.schema";

interface EditCategoryFormProps {
  categoryId: string;
}

// ✅ Helper function to get error message from various error types
const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "Invalid value";
};

// ✅ Helper to convert form values to API payload
const toApiPayload = (
  formValues: UpdateCategoryFormValues,
): UpdateCategoryPayload => {
  return {
    name: formValues.name || undefined,
    description: formValues.description || undefined,
    icon: formValues.icon || undefined,
    color:
      formValues.color && formValues.color.trim() !== ""
        ? formValues.color
        : undefined,
    isActive: formValues.isActive,
  };
};

export function EditCategoryForm({ categoryId }: EditCategoryFormProps) {
  const router = useRouter();
  const { data: category, isLoading: isCategoryLoading } =
    useCategory(categoryId);
  const { mutateAsync, isPending: isMutating } = useUpdateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      color: "",
      isActive: true,
    } as UpdateCategoryFormValues,
    onSubmit: async ({ value }) => {
      try {
        const payload = toApiPayload(value);
        await mutateAsync({ id: categoryId, payload });
        toast.success("Category updated successfully");
        router.push("/admin/categories");
        router.refresh();
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update category";
        toast.error(message);
      }
    },
  });

  // Update form values when category data loads
  useEffect(() => {
    if (category) {
      form.setFieldValue("name", category.name || "");
      form.setFieldValue("description", category.description || "");
      form.setFieldValue("icon", category.icon || "");
      form.setFieldValue("color", category.color || "");
      form.setFieldValue("isActive", category.isActive ?? true);
    }
  }, [category, form]);

  const isPending = isMutating || form.state.isSubmitting;
  const isLoading = isCategoryLoading;

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!category) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-10 text-center text-muted-foreground">
          Category not found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Category</CardTitle>
        <CardDescription>Update category: {category.name}</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Name Field */}
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Name *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g. Renewable Energy"
                  disabled={isPending}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.map((error, index) => (
                  <p key={index} className="text-sm text-destructive">
                    {getErrorMessage(error)}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          {/* Description Field */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={3}
                  placeholder="Brief description (optional)"
                  disabled={isPending}
                />
              </div>
            )}
          </form.Field>

          {/* Icon & Color Fields */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="icon">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Icon (Emoji)</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="🌱"
                    disabled={isPending}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="color">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Color (Hex)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="#10b981"
                      disabled={isPending}
                      className="flex-1"
                    />
                    {field.state.value &&
                      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(
                        field.state.value,
                      ) && (
                        <div
                          className="h-10 w-10 rounded-md border shadow-sm"
                          style={{ backgroundColor: field.state.value }}
                          aria-label="Color preview"
                        />
                      )}
                  </div>
                  {field.state.meta.errors.map((error, index) => (
                    <p key={index} className="text-sm text-destructive">
                      {getErrorMessage(error)}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

          {/* Active Status Switch */}
          <form.Field name="isActive">
            {(field) => (
              <div className="flex items-center justify-between py-2">
                <Label htmlFor={field.name} className="cursor-pointer">
                  Active Status
                </Label>
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                  disabled={isPending}
                />
              </div>
            )}
          </form.Field>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
