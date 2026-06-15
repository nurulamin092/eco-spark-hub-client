/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createIdeaSchema,
  CreateIdeaFormValues,
} from "../schema/create-idea.schema";
import { useCreateIdea } from "./useCreateIdea";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreateIdeaForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync, isPending } = useCreateIdea();

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const response = await ideaService.getCategories();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  const form = useForm({
    defaultValues: {
      title: "",
      problem: "",
      solution: "",
      description: "",
      categoryId: "",
      isPaid: false,
      price: null, //  null instead of undefined
    } as CreateIdeaFormValues,
    onSubmit: async ({ value }) => {
      setServerError(null);

      console.log(" Form submitted:", {
        isPaid: value.isPaid,
        price: value.price,
      });

      const payload: any = {
        title: value.title,
        problem: value.problem,
        solution: value.solution,
        description: value.description,
        categoryId: value.categoryId,
        isPaid: value.isPaid,
      };

      if (value.isPaid === true) {
        if (value.price && value.price >= 0.5) {
          payload.price = Number(value.price);
        } else {
          setServerError(
            "Please enter a valid price (minimum $0.50) for premium content",
          );
          return;
        }
      }

      if (uploadedImages.length > 0) {
        payload.images = uploadedImages;
      }

      console.log("📦 Final payload:", payload);

      try {
        await mutateAsync(payload);
      } catch (error: any) {
        console.error(" Submit error:", error);
        setServerError(error.message || "Failed to create idea");
      }
    },
    validators: {
      onChange: ({ value }) => {
        const result = createIdeaSchema.safeParse(value);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.issues.forEach((issue) => {
            const path = issue.path[0];
            if (path && typeof path === "string") {
              errors[path] = issue.message;
            }
          });
          console.log(" Validation errors:", errors);
          return errors;
        }
        return undefined;
      },
    },
  });

  return {
    form,
    isPending,
    serverError,
    categories,
    isLoadingCategories,
    uploadedImages,
    setUploadedImages,
    isUploading,
    setIsUploading,
  };
}
