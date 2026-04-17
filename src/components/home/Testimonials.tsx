"use client";

import { useQuery } from "@tanstack/react-query";
import { ideaService } from "@/features/idea/shared/services/idea.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.ideas.testimonials(3),
    queryFn: () => ideaService.getTestimonials(3),
  });

  const testimonials = data?.data || [];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-muted-foreground">
              Real stories from real changemakers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  return (
    <section className="py-16 bg-linear-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Community Says
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from real changemakers making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <
                      Math.min(
                        5,
                        Math.floor(
                          (item.upvoteCount - item.downvoteCount) / 10,
                        ) + 3,
                      )
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 line-clamp-4">
                &quot;{item.description?.slice(0, 150)}...&quot;
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
