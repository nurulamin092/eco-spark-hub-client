"use client";

import { useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { useCategories } from "../hooks/useCategories";

export function CategoryList() {
  const { data: categories, isLoading, error, refetch } = useCategories();

  const handleDelete = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load categories. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No categories found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
