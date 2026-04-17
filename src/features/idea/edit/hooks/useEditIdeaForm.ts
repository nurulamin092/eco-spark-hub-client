/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ideaService } from "../../shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { EditIdeaPayload } from "../types/edit-idea.types";
import { useEditIdea } from "./useEditIdea";
import { useIdeaForEdit } from "./useIdeaForEdit";

interface UseEditIdeaFormProps {
  ideaId: string;
}

export function useEditIdeaForm({ ideaId }: UseEditIdeaFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useEditIdea(ideaId);
  const { data: idea, isLoading, error, refetch } = useIdeaForEdit(ideaId);

  const { data: categoriesData } = useQuery({
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
      price: undefined as number | undefined,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const payload: EditIdeaPayload = {};
      if (value.title !== idea?.title) payload.title = value.title;
      if (value.problem !== idea?.problem) payload.problem = value.problem;
      if (value.solution !== idea?.solution) payload.solution = value.solution;
      if (value.description !== idea?.description)
        payload.description = value.description;
      if (value.categoryId !== idea?.categoryId)
        payload.categoryId = value.categoryId;
      if (value.isPaid !== idea?.isPaid) payload.isPaid = value.isPaid;
      if (value.price !== idea?.price) payload.price = value.price;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes detected");
        return;
      }

      try {
        await mutateAsync(payload);
      } catch (err: any) {
        setServerError(err.message);
      }
    },
  });

  // Populate form when idea loads
  useEffect(() => {
    if (idea) {
      form.update({
        defaultValues: {
          title: idea.title,
          problem: idea.problem,
          solution: idea.solution,
          description: idea.description,
          categoryId: idea.categoryId,
          isPaid: idea.isPaid,
          price: idea.price || undefined,
        },
      });
    }
  }, [idea, form]);

  const handlePriceChange = useCallback(
    (isPaid: boolean) => {
      if (!isPaid) {
        form.setFieldValue("price", undefined);
      }
    },
    [form],
  );

  const isPaid = form.getFieldValue("isPaid");

  useEffect(() => {
    handlePriceChange(isPaid);
  }, [isPaid, handlePriceChange]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    form,
    isPending,
    serverError,
    categories,
    isLoading,
    error,
    idea,
    isPaid,
    handleGoBack,
    refetch,
  };
}
