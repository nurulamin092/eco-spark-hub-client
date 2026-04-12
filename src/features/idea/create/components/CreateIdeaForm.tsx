"use client";

import { useEffect } from "react";
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
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { IdeaFormFields } from "./IdeaFormFields";
import { useCreateIdeaForm } from "../hooks/useCreateIdeaForm";

export function CreateIdeaForm() {
  const {
    form,
    isPending,
    serverError,
    categories,
    isLoadingCategories,
    handlePriceChange,
  } = useCreateIdeaForm();

  // Single source of truth (form state)
  const isPaid = form.getFieldValue("isPaid");

  // Sync price যখন isPaid change হয়
  useEffect(() => {
    handlePriceChange(isPaid);
  }, [isPaid, handlePriceChange]);

  // Loading state (categories)
  if (isLoadingCategories) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardContent className="py-10">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Idea</CardTitle>
        <CardDescription>
          Help the community by sharing your sustainability idea. Your idea will
          be reviewed before publishing.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-6">
          {/* Title */}
          <form.Field name="title">
            {(field) => (
              <IdeaFormFields
                field={field}
                label="Title"
                placeholder="Enter a catchy title"
                disabled={isPending}
              />
            )}
          </form.Field>

          {/* Category */}
          <form.Field name="categoryId">
            {(field) => (
              <IdeaFormFields
                field={field}
                label="Category"
                type="select"
                options={categories}
                disabled={isPending}
              />
            )}
          </form.Field>

          {/* Problem */}
          <form.Field name="problem">
            {(field) => (
              <IdeaFormFields
                field={field}
                label="Problem Statement"
                type="textarea"
                placeholder="Describe the problem..."
                rows={4}
                disabled={isPending}
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
                placeholder="Describe your solution..."
                rows={4}
                disabled={isPending}
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
                placeholder="Provide full details..."
                rows={6}
                disabled={isPending}
              />
            )}
          </form.Field>

          {/* Paid Toggle */}
          <form.Field name="isPaid">
            {(field) => (
              <IdeaFormFields
                field={field}
                label="Premium Content"
                type="switch"
                disabled={isPending}
              />
            )}
          </form.Field>

          {/* Conditional Price */}
          {Boolean(isPaid) && (
            <form.Field name="price">
              {(field) => (
                <IdeaFormFields
                  field={field}
                  label="Price (USD)"
                  type="number"
                  placeholder="Enter price"
                  disabled={isPending}
                />
              )}
            </form.Field>
          )}

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
              onClick={() => form.reset()}
              disabled={isPending}
            >
              Reset
            </Button>

            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? (
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

      <CardFooter className="border-t pt-6 flex justify-center">
        <Link
          href="/member/ideas"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Ideas
        </Link>
      </CardFooter>
    </Card>
  );
}
