// ============ src/features/category/components/CategoryList.tsx ============
"use client";

import { CategoryCard } from "./CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCategories } from "../shared/hooks/useCategories";

export function CategoryList() {
  const { data: categories, isLoading, refetch } = useCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground mb-4">No categories found</p>
        <Link href="/admin/categories/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create First Category
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={() => refetch()}
        />
      ))}
    </div>
  );
}
