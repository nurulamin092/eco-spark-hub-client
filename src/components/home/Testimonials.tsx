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
      <section className=" relative overflow-hidden py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[140px]" />

          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-[140px]" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="animate-fade-in-up mb-16 text-center">
            <h2
              className=" mt-6
    text-4xl
    font-extrabold
    tracking-tight
    md:text-5xl"
            >
              What Our Community Says
            </h2>
            <p className="text-muted-foreground">
              Real stories from real changemakers
            </p>
          </div>
          <div
            className="grid
grid-cols-1
gap-8
md:grid-cols-2
xl:grid-cols-3"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="
    pointer-events-none
    absolute
    inset-0
    overflow-hidden
  "
      >
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[140px] " />

        <div className=" absolute right-0 bottom-0  h-72  w-72  rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="animate-fade-in-up mb-16 text-center">
          <div className=" glass inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>Testimonials</span>
          </div>
          <h2 className=" mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            What Our Community Says
          </h2>
          <p className=" mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground/80">
            Real stories from real changemakers making a difference
          </p>
        </div>

        <div
          className="grid
grid-cols-1
gap-8
md:grid-cols-2
xl:grid-cols-3"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group glass border-gradient relative flex flex-col overflow-hidden rounded-3xl p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-premium"
            >
              <div
                aria-hidden="true"
                className=" pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <Quote
                className="absolute
    right-8
    top-8
    h-12
    w-12
    text-primary/10
    transition-transform
    duration-500
     group-hover:rotate-12
    group-hover:scale-110"
              />
              <div className=" mb-6 flex items-center gap-1">
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
              <p
                className="flex-1
    line-clamp-4
    text-base
    leading-8
    text-muted-foreground/80"
              >
                &quot;{item.description?.slice(0, 150)}...&quot;
              </p>
              <div className="my-6 h-px w-full bg-border/60" />
              <div className=" mt-auto flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                  <AvatarImage src={item.author.image || ""} />
                  <AvatarFallback>{item.author.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold tracking-tight">
                    {item.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground/80">
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
