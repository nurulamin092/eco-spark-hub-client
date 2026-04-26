// ============ src/features/idea/edit/components/EditIdeaForm.tsx ============
"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { EditIdeaFormFields } from "./EditIdeaFormFields";
import { useCategories } from "@/features/category/shared/hooks/useCategories";
import { useIdeaForEdit } from "../hooks/useIdeaForEdit";
import { useUpdateIdea } from "../hooks/useUpdateIdea";

interface EditIdeaFormProps {
  ideaId: string;
}

interface FormValues {
  title: string;
  problem: string;
  solution: string;
  description: string;
  categoryId: string;
  isPaid: boolean;
  price?: number;
}

export function EditIdeaForm({ ideaId }: EditIdeaFormProps) {
  const router = useRouter();
  const { data: idea, isLoading: isLoadingIdea } = useIdeaForEdit(ideaId);
  const { mutateAsync: updateIdea, isPending: isUpdating } =
    useUpdateIdea(ideaId);
  const { data: categories = [] } = useCategories();

  // ✅ Fix: Use useForm without generic parameter, use type assertion
  const form = useForm({
    defaultValues: {
      title: "",
      problem: "",
      solution: "",
      description: "",
      categoryId: "",
      isPaid: false,
      price: undefined,
    } as FormValues,
    onSubmit: async ({ value }) => {
      try {
        await updateIdea(value);
        toast.success("Idea updated successfully");
        router.push(`/ideas/${ideaId}`);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update idea",
        );
      }
    },
  });

  // Populate form when idea loads
  useEffect(() => {
    if (idea) {
      form.setFieldValue("title", idea.title);
      form.setFieldValue("problem", idea.problem);
      form.setFieldValue("solution", idea.solution);
      form.setFieldValue("description", idea.description);
      form.setFieldValue("categoryId", idea.categoryId);
      form.setFieldValue("isPaid", idea.isPaid);
      form.setFieldValue("price", idea.price || undefined);
    }
  }, [idea, form]);

  const isPaid = form.getFieldValue("isPaid");
  const isPending = isUpdating || form.state.isSubmitting;

  if (isLoadingIdea) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="py-10">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!idea) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="py-10 text-center text-muted-foreground">
          Idea not found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Idea</CardTitle>
        <CardDescription>Update your sustainability idea</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field name="title">
            {(field) => (
              <EditIdeaFormFields
                name={field.name}
                label="Title"
                value={field.state.value}
                error={field.state.meta.errors?.[0]}
                onChange={(val) => field.handleChange(val as string)}
                onBlur={field.handleBlur}
                placeholder="Enter a catchy title"
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="categoryId">
            {(field) => (
              <EditIdeaFormFields
                name={field.name}
                label="Category"
                type="select"
                value={field.state.value}
                error={field.state.meta.errors?.[0]}
                onChange={(val) => field.handleChange(val as string)}
                onBlur={field.handleBlur}
                options={categories}
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="problem">
            {(field) => (
              <EditIdeaFormFields
                name={field.name}
                label="Problem Statement"
                type="textarea"
                value={field.state.value}
                error={field.state.meta.errors?.[0]}
                onChange={(val) => field.handleChange(val as string)}
                onBlur={field.handleBlur}
                placeholder="Describe the problem you're solving"
                rows={4}
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="solution">
            {(field) => (
              <EditIdeaFormFields
                name={field.name}
                label="Proposed Solution"
                type="textarea"
                value={field.state.value}
                error={field.state.meta.errors?.[0]}
                onChange={(val) => field.handleChange(val as string)}
                onBlur={field.handleBlur}
                placeholder="Describe your solution"
                rows={4}
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <EditIdeaFormFields
                name={field.name}
                label="Detailed Description"
                type="textarea"
                value={field.state.value}
                error={field.state.meta.errors?.[0]}
                onChange={(val) => field.handleChange(val as string)}
                onBlur={field.handleBlur}
                placeholder="Provide full details about your idea"
                rows={6}
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="isPaid">
            {(field) => (
              <EditIdeaFormFields
                name={field.name}
                label="Premium Content"
                type="switch"
                value={field.state.value}
                onChange={(val) => field.handleChange(val as boolean)}
                onBlur={field.handleBlur}
                disabled={isPending}
              />
            )}
          </form.Field>

          {isPaid && (
            <form.Field name="price">
              {(field) => (
                <EditIdeaFormFields
                  name={field.name}
                  label="Price (USD)"
                  type="number"
                  value={field.state.value}
                  error={field.state.meta.errors?.[0]}
                  onChange={(val) => field.handleChange(val as number)}
                  onBlur={field.handleBlur}
                  placeholder="Enter price"
                  disabled={isPending}
                />
              )}
            </form.Field>
          )}

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