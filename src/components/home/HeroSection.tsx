"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim())
      router.push(`/ideas?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="py-20 md:py-32 bg-linear-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Share Ideas That{" "}
          <span className="text-primary">Change the Planet</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join a community of innovators working together to create a
          sustainable future.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex gap-2 max-w-md mx-auto mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sustainability ideas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex gap-4 justify-center">
          <Link href="/ideas">
            <Button size="lg">Explore Ideas</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
