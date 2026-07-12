// ============ src/components/home/CategoriesSection.tsx ============
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/features/category/shared/services/category.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <section className=" relative overflow-hidden py-24 lg:py-32 bg-muted/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden "
        >
          <div className=" absolute right-0 top-20  h-80 w-80 rounded-full  bg-primary/10 blur-[140px]" />

          <div className=" absolute left-0 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-[140px]" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="animate-fade-in-up mb-16 text-center">
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              Browse by Category
            </h2>
            <p className=" mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground/80">
              Find ideas in your area of interest
            </p>
          </div>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-72 rounded-3xl" />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Skeleton className="h-12 w-56 rounded-full" />
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
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[150px] " />

        <div className=" absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="animate-fade-in-up mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary">
            <Grid3X3 className="h-4 w-4" />
            <span>Categories</span>
          </div>
          <h2 className=" mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Browse by Category
          </h2>
          <p className=" mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground/80">
            Find sustainability ideas in your area of interest
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/ideas?category=${category.id}`}
              className="group glass border-gradient relative overflow-hidden rounded-3xl p-8 shadow-card will-change-transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-premium"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-transparent  to-transparent opacity-0 transition-opacity duration-500group-hover:opacity-100"
              />
              <div className="relative flex flex-col items-center text-center">
                <div className=" mb-6 flex h-20 w-20 items-center justify-center rounded-full  bg-primary/10 text-5xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/20">
                  {category.icon || categoryIcons[category.name] || "🌱"}
                </div>
                <h3 className=" text-xl font-bold tracking-tight transition-all duration-300 group-hover:text-primary">
                  {category.name}
                </h3>
                <p className=" mt-2 text-sm text-muted-foreground">
                  Sustainability Category
                </p>
                <div className=" my-5 h-px w-full bg-border/60 transition-colors duration-300 group-hover:bg-primary/20" />
                <p className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary/20">
                  {category._count?.ideas || 0} ideas
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link href="/ideas">
            <Button
              size="lg"
              variant="outline"
              className="
        group
        rounded-full
        px-8
        transition-all
        duration-300
        hover:-translate-y-1
      "
            >
              Explore All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
