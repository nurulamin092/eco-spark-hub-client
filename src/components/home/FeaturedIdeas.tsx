"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "@/features/idea/shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { IdeaCard } from "@/features/idea/list/components/IdeaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedIdeas() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.ideas.featured(3),
    queryFn: () => ideaService.getFeaturedIdeas(3),
  });

  const ideas = data?.data || [];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Featured Ideas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trending Sustainability Ideas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the most promising ideas from our community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Featured Ideas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending Sustainability Ideas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most promising ideas from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        <div className="text-center mt-10">
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
