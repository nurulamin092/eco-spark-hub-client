/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import {
  editCategorySchema,
  EditCategoryFormValues,
} from "../schema/edit-category.schema";
import { useEditCategory } from "./useEditCategory";
import { useCategoryForEdit } from "./useCategoryForEdit";
import { toast } from "sonner";

interface UseEditCategoryFormProps {
  categoryId: string;
}

export function useEditCategoryForm({ categoryId }: UseEditCategoryFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useEditCategory(categoryId);
  const { data: category, isLoading, error } = useCategoryForEdit(categoryId);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      color: "",
      isActive: true,
    } as EditCategoryFormValues,
    onSubmit: async ({ value }) => {
      setServerError(null);

      const payload: EditCategoryFormValues = {};
      if (value.name !== category?.name) payload.name = value.name;
      if (value.description !== category?.description)
        payload.description = value.description;
      if (value.icon !== category?.icon) payload.icon = value.icon;
      if (value.color !== category?.color) payload.color = value.color;
      if (value.isActive !== category?.isActive)
        payload.isActive = value.isActive;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes detected");
        return;
      }

      try {
        await mutateAsync(payload);
      } catch (error: any) {
        setServerError(error.message);
      }
    },
    validators: {
      onChange: ({ value }) => {
        const result = editCategorySchema.safeParse(value);
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

  useEffect(() => {
    if (category) {
      form.update({
        defaultValues: {
          name: category.name,
          description: category.description || "",
          icon: category.icon || "",
          color: category.color || "",
          isActive: category.isActive,
        },
      });
    }
  }, [category, form]);

  return {
    form,
    isPending,
    serverError,
    isLoading,
    error,
    category,
  };
}
