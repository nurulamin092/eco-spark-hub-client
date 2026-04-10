/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaApi } from "@/lib/api/idea.api";
import { queryKeys } from "@/lib/react-query/queryClient";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.ideas.testimonials(3),
    queryFn: () => ideaApi.getTestimonials(3),
  });

  const testimonials = data?.data?.testimonials || [];

  if (isLoading || !testimonials.length) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Top Rated Ideas</h2>
        <p className="text-muted-foreground text-center mb-12">
          See what our community is talking about
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item: any) => (
            <div
              key={item.id}
              className="bg-card rounded-lg p-6 shadow-sm border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(item.netVotes / 30) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.author.image || ""} />
                  <AvatarFallback>{item.author.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{item.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.category.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
