// ============ src/features/category/create/components/CreateCategoryForm.tsx ============
"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { useCreateCategory } from "../hooks/useCreateCategory";
import type { CreateCategoryFormValues } from "../../shared/schemas/category.schema";
import type { CreateCategoryPayload } from "../../shared/types/category.types";

// Helper to convert form values to API payload
function toApiPayload(
  formValues: CreateCategoryFormValues,
): CreateCategoryPayload {
  return {
    name: formValues.name,
    description: formValues.description ?? undefined,
    icon: formValues.icon ?? undefined,
    color: formValues.color ?? undefined,
  };
}

export function CreateCategoryForm() {
  const router = useRouter();
  const { mutateAsync, isPending: isMutating } = useCreateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      color: "",
    } as CreateCategoryFormValues,
    onSubmit: async ({ value }) => {
      try {
        const payload = toApiPayload(value);
        await mutateAsync(payload);
        toast.success("Category created successfully");
        router.push("/admin/categories");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to create category";
        toast.error(message);
      }
    },
  });

  const isPending = isMutating || form.state.isSubmitting;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>Add a new category for ideas</CardDescription>
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
                    {error}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

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
                    {field.state.value && (
                      <div
                        className="h-10 w-10 rounded-md border shadow-sm"
                        style={{ backgroundColor: field.state.value }}
                        aria-label="Color preview"
                      />
                    )}
                  </div>
                  {field.state.meta.errors.map((error, index) => (
                    <p key={index} className="text-sm text-destructive">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

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

            <Button type="submit" disabled={isPending || !form.state.canSubmit}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Category
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
