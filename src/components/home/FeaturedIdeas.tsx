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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Featured Ideas</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Trending Sustainability Ideas
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover the most promising ideas from our community
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Featured Ideas</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Trending Sustainability Ideas
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover the most promising ideas from our community
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/ideas">
            <Button variant="outline" size="lg">
              View All Ideas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
