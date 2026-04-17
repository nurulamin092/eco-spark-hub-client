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

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
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
    }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold mb-1">{stat.label}</div>
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
