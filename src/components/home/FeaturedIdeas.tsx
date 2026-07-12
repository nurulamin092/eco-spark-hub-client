// ============ src/components/home/FeaturedIdeas.tsx ============
"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "@/features/idea/shared/services/idea.service";
import { IdeaCard } from "@/features/idea/list/components/IdeaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const QUERY_KEYS = {
  featuredIdeas: ["ideas", "featured"] as const,
};

export function FeaturedIdeas() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.featuredIdeas,
    queryFn: () => ideaService.getFeaturedIdeas(3),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const ideas = data?.data || [];

  if (isLoading) {
    return (
      <section
        className="relative
    overflow-hidden
    py-24
    lg:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up mb-16 text-center">
            <div
              className="glass
    animate-fade-in-up
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-primary/20
    px-4
    py-2
    text-sm
    font-medium
    text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span>Featured Ideas</span>
            </div>
            <h2
              className=" mt-6
    text-4xl
    font-extrabold
    tracking-tight
    md:text-5xl"
            >
              Trending Sustainability Ideas
            </h2>
            <p
              className=" mx-auto
    mt-5
    max-w-2xl
    text-lg
    leading-8
    text-muted-foreground/80"
            >
              Discover the most promising ideas from our community
            </p>
          </div>
          <div
            className="  mt-16
    grid
    grid-cols-1
    gap-8
    md:grid-cols-2
    xl:grid-cols-3"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!ideas.length) return null;

  return (
    <section
      className=" relative
    overflow-hidden
    py-24
    lg:py-32"
    >
      <div
        aria-hidden="true"
        className="
    absolute
    inset-0
    overflow-hidden
    pointer-events-none"
      >
        <div
          className="
      absolute
      left-1/2
      top-24
      h-80
      w-80
      -translate-x-1/2
      rounded-full
      bg-primary/10
      blur-[120px]
    "
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-up mb-16 text-center">
          <div
            className="glass
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-primary/20
    px-4
    py-2
    text-sm
    font-medium
    text-primary"
          >
            <Sparkles className="h-4 w-4" />
            <span>Featured Ideas</span>
          </div>
          <h2
            className=" mt-6
    text-4xl
    font-extrabold
    tracking-tight
    md:text-5xl"
          >
            Trending Sustainability Ideas
          </h2>
          <p
            className=" mx-auto
    mt-5
    max-w-2xl
    text-lg
    leading-8
    text-muted-foreground/80"
          >
            Discover the most promising ideas from our community
          </p>
        </div>

        <div
          className=" mt-16
    grid
    grid-cols-1
    gap-8
    md:grid-cols-2
    xl:grid-cols-3"
        >
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        <div
          className=" mt-16
    flex
    justify-center"
        >
          <Link href="/ideas">
            <Button
              variant="outline"
              size="lg"
              className=" group
    rounded-full
    px-8
    transition-all
    duration-300
    hover:-translate-y-1"
            >
              View All Ideas
              <ArrowRight
                className=" ml-2
    h-4
    w-4
    transition-transform
    duration-300
    group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
