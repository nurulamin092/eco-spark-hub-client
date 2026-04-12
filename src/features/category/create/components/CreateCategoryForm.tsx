"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCreateCategory } from "../hooks/useCreateCategory";
import {
  createCategorySchema,
  CreateCategoryFormValues,
} from "../schema/create-category.schema";

export function CreateCategoryForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      color: "",
    } as CreateCategoryFormValues,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      router.push("/admin/categories");
    },
    validators: {
      onChange: ({ value }) => {
        const result = createCategorySchema.safeParse(value);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.issues.forEach((issue) => {
            const path = issue.path[0];
            if (path && typeof path === "string") {
              errors[path] = issue.message;
            }
          });
          return errors;
        }
        return undefined;
      },
    },
  });

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
          className="space-y-4"
        >
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Name *</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  placeholder="e.g., Renewable Energy"
                />
                {field.state.meta.errors.map((err) => (
                  <p key={err} className="text-sm text-destructive">
                    {err}
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
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  placeholder="Brief description of this category"
                  rows={3}
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
                    value={field.state.value || ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                    placeholder="🌱"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="color">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Color (Hex)</Label>
                  <div className="flex gap-2">
                    <Input
                      id={field.name}
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isPending}
                      placeholder="#10b981"
                    />
                    {field.state.value && (
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: field.state.value }}
                      />
                    )}
                  </div>
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
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Category"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
