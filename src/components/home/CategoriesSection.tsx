// ============ src/components/home/CategoriesSection.tsx ============
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/features/category/shared/services/category.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3 } from "lucide-react";

// Default icons for categories based on name
const categoryIcons: Record<string, string> = {
  Energy: "⚡",
  Waste: "🗑️",
  Transportation: "🚗",
  Food: "🍔",
  Water: "💧",
  Biodiversity: "🌿",
  Education: "📚",
  Technology: "💻",
  "Waste Management": "🗑️",
  "Water Conservation": "💧",
  Agriculture: "🌾",
  Recycling: "♻️",
  "Climate Action": "🌍",
  "Urban Planning": "🏙️",
};

export function CategoriesSection() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find ideas in your area of interest
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  // Take only first 8 categories
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Grid3X3 className="h-4 w-4" />
            <span>Categories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find sustainability ideas in your area of interest
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/ideas?category=${category.id}`}
              className="group p-6 rounded-xl bg-card border hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">
                  {category.icon || categoryIcons[category.name] || "🌱"}
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {category._count?.ideas || 0} ideas
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
