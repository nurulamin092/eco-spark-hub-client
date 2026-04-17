"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, ArrowRight, Leaf } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ideas?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-background py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Join 10,000+ changemakers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Share Ideas That{" "}
            <span className="text-primary relative">
              Change the Planet
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                viewBox="0 0 200 10"
              >
                <path
                  d="M0,5 Q50,0 100,5 Q150,10 200,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join a community of innovators working together to create a
            sustainable future. Share your eco-friendly ideas, get feedback, and
            make a real impact.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sustainability ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <Button type="submit" size="lg" className="sm:w-auto w-full">
              Explore Ideas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="default">
                Get Started
                <Leaf className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ideas">
              <Button size="lg" variant="outline">
                Browse Ideas
              </Button>
            </Link>
          </div>

          {/* Trusted by */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by innovators from
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <span className="text-lg font-semibold">🌱 GreenTech</span>
              <span className="text-lg font-semibold">♻️ EcoFund</span>
              <span className="text-lg font-semibold">💡 SustainLab</span>
              <span className="text-lg font-semibold">🌍 EarthFirst</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
