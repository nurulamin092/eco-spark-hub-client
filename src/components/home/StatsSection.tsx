// ============ src/components/home/StatsSection.tsx ============
"use client";

import { Users, Lightbulb, ThumbsUp, Globe } from "lucide-react";
import { Counter } from "./Counter";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils/cn";

const STATS = [
  {
    id: 1,
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Members",
    description: "Creators and innovators building sustainable solutions.",
  },
  {
    id: 2,
    icon: Lightbulb,
    value: 500,
    suffix: "+",
    label: "Ideas Shared",
    description: "Eco-friendly ideas published by the community.",
  },
  {
    id: 3,
    icon: ThumbsUp,
    value: 25000,
    suffix: "+",
    label: "Community Votes",
    description: "Votes helping highlight impactful ideas.",
  },
  {
    id: 4,
    icon: Globe,
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "People collaborating from around the world.",
  },
];

export function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "mx-auto mb-16 max-w-3xl text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Community Impact
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Together We Create
            <span className="text-primary"> Real Impact</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Every shared idea, every community vote, and every active member
            contributes to building a greener and more sustainable future.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className={cn(
                `
      group
      glass
      border-gradient
      rounded-3xl
      p-8
      text-center
      shadow-card
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-premium
    `,
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
              style={{
                transitionDelay: `${stat.id * 120}ms`,
              }}
            >
              <div
                className=" mx-auto
    mb-6
    flex
    h-16
    w-16
    items-center
    justify-center
    rounded-2xl
    bg-primary/10
    text-primary
    transition-all
    duration-300
    group-hover:scale-110
    group-hover:bg-primary
    group-hover:text-primary-foreground"
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className=" mb-3
    text-4xl
    font-black
    tracking-tight
    lg:text-5xl
    bg-linear-to-r
    from-primary
    to-emerald-500
    bg-clip-text
    text-transparent"
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mb-2 text-lg font-semibold">{stat.label}</div>
              <div className="text-sm leading-7 text-muted-foreground/80">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
