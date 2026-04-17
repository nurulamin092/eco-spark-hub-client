/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useCallback, useMemo } from "react";
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
  const { mutateAsync, isPending } = useCreateIdea();

  // Fetch categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const response = await ideaService.getCategories();
      return response.data;
    },
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
      price: undefined,
    } as CreateIdeaFormValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await mutateAsync(value);
      } catch (error: any) {
        setServerError(error.message);
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
          return errors;
        }
        return undefined;
      },
    },
  });

  const handlePriceChange = useCallback(
    (isPaid: boolean) => {
      if (!isPaid) {
        form.setFieldValue("price", undefined);
      }
    },
    [form],
  );

  return {
    form,
    isPending,
    serverError,
    categories,
    isLoadingCategories,
    handlePriceChange,
  };
}
