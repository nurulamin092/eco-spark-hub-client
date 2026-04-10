/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaApi } from "@/lib/api/idea.api";
import { queryKeys } from "@/lib/react-query/queryClient";
import { IdeaCard } from "@/features/idea/components/IdeaCard";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedIdeas() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.ideas.featured(3),
    queryFn: () => ideaApi.getFeatured(3),
  });

  const ideas = data?.data || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Ideas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!ideas.length) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Ideas</h2>
        <p className="text-muted-foreground text-center mb-12">
          Discover the most promising sustainability ideas
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ideas.map((idea: any) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </section>
  );
}
