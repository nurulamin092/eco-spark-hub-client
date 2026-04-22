// ============ src/components/home/StatsSection.tsx ============
"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Users, Lightbulb, ThumbsUp, Globe } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Members",
    description: "Join our growing community",
  },
  {
    id: 2,
    icon: Lightbulb,
    value: 500,
    suffix: "+",
    label: "Sustainable Ideas",
    description: "Shared by innovators",
  },
  {
    id: 3,
    icon: ThumbsUp,
    value: 25000,
    suffix: "+",
    label: "Community Votes",
    description: "Help shape the best ideas",
  },
  {
    id: 4,
    icon: Globe,
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "Global impact",
  },
];

interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="mb-2 text-3xl font-bold md:text-4xl">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mb-1 font-semibold">{stat.label}</div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
