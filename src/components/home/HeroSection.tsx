"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback, useState } from "react";

export function HeroSection() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const value = searchQuery.trim();

      if (!value) return;

      router.push(`/ideas?search=${encodeURIComponent(value)}`);
    },
    [router, searchQuery],
  );
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
        <div className="bg-grid absolute inset-0" />
      </div>
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid min-h-[calc(100vh-110px)] py-16 items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div className="animate-hero max-w-2xl">
            {/* Badge */}
            <div className=" animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Trusted by 10,000+ Sustainability Innovators
            </div>

            {/* Heading */}
            <h1 className=" animate-fade-in-up  delay-100 text-5xl font-black leading-tight tracking-tight text-foreground md:text-6xl xl:text-7xl">
              Share Ideas
              <br />
              That{" "}
              <span className="bg-linear-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent">
                Change
              </span>
              <br />
              The Planet
            </h1>

            {/* Description */}
            <p className=" animate-fade-in-up delay-200 mt-8 max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">
              Discover innovative sustainability ideas, collaborate with
              changemakers, receive community feedback, and build a greener
              future together.
            </p>
            {/* CTA */}
            <div className="animate-fade-in-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="
        h-14
        rounded-full
        px-8
        text-base
        shadow-premium
        transition-all
        duration-500
        hover:scale-[1.01]
        hover:shadow-xl
      "
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/ideas">
                <Button
                  variant="outline"
                  size="lg"
                  className="
        glass
        h-14
        rounded-full
        px-8
        text-base
        transition-all
        duration-500
        hover:bg-primary/5
      "
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Explore Ideas
                </Button>
              </Link>
            </div>
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="animate-fade-in-up delay-500 mt-10"
            >
              <div className="glass border-gradient flex flex-col gap-3 rounded-3xl p-3 shadow-card sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sustainability ideas..."
                    className="
          h-14
          w-full
          rounded-2xl
          bg-transparent
          pl-14
          pr-16
          text-base
          outline-none
          placeholder:text-muted-foreground
        "
                  />

                  <span
                    className="
          absolute
          right-4
          top-1/2
          hidden
          -translate-y-1/2
          rounded-lg
          border
          px-2
          py-1
          text-xs
          text-muted-foreground
          md:block
        "
                  >
                    ⌘ K
                  </span>
                </div>

                <Button type="submit" className="h-14 rounded-2xl px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Popular:</span>

                  {["Renewable Energy", "Solar", "Recycling", "Water"].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          router.push(
                            `/ideas?search=${encodeURIComponent(item)}`,
                          )
                        }
                        className="rounded-full border px-3 py-1 text-muted-foreground transition-all  hover:bg-primary/10 hover:text-primary"
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </form>
            <div className="animate-fade-in-up delay-600 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>✓ No credit card required</span>

              <span>✓ Free forever plan</span>

              <span>✓ Join 10,000+ innovators</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow */}
            <div className="animate-glow absolute left-1/2 top-1/2 -z-10 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

            {/* Dashboard */}
            <div className="animate-dashboard glass border-gradient shadow-premium relative w-full max-w-140 overflow-hidden rounded-[34px] p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015]  hover:shadow-2xl">
              <div
                aria-hidden="true"
                className="
    pointer-events-none
    absolute
    inset-0
    rounded-[34px]
   bg-linear-to-br
    from-white/10
    via-transparent
    to-transparent
  "
              />
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Community Dashboard
                    </p>

                    <h3 className="text-xl font-bold">EcoSpark Hub</h3>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-green-500/15 px-3 py-1">
                    <span className="animate-live h-2.5 w-2.5 rounded-full bg-green-500" />

                    <span className="text-xs font-semibold text-green-500">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border bg-background/40  p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-card hover:border-primary/40 hover:bg-primary/5">
                    <p className="text-sm text-muted-foreground">Ideas</p>

                    <p className="mt-2 text-3xl font-bold">1,248</p>
                  </div>

                  <div className="rounded-2xl border bg-background/40 backdrop-blur-xl p-5  transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-card hover:border-primary/40 hover:bg-primary/5">
                    <p className="text-sm text-muted-foreground">Members</p>

                    <p className="mt-2 text-3xl font-bold">10.2K</p>
                  </div>

                  <div className="rounded-2xl border bg-background/40 backdrop-blur-xl p-5  transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-primary/30 hover:bg-primary/5">
                    <p className="text-sm text-muted-foreground">Votes</p>

                    <p className="mt-2 text-3xl font-bold">24K</p>
                  </div>

                  <div className="rounded-2xl border bg-background/40 backdrop-blur-xl p-5  transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-primary/30 hover:bg-primary/5">
                    <p className="text-sm text-muted-foreground">Impact</p>

                    <p className="mt-2 text-3xl font-bold">94%</p>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="mb-4 flex items-end gap-3 h-36">
                    <div
                      className="animate-bar w-full rounded-full bg-primary/20"
                      style={{
                        height: 80,
                        animationDelay: ".1s",
                      }}
                    />

                    <div
                      className="animate-bar w-full rounded-full bg-primary/20"
                      style={{
                        height: 80,
                        animationDelay: ".1s",
                      }}
                    />

                    <div
                      className="animate-bar w-full rounded-full bg-primary/20"
                      style={{
                        height: 110,
                        animationDelay: ".2s",
                      }}
                    />

                    <div
                      className="animate-bar w-full rounded-full bg-primary/20"
                      style={{
                        height: 145,
                        animationDelay: ".3s",
                      }}
                    />

                    <div
                      className="animate-bar w-full rounded-full bg-primary/20"
                      style={{
                        height: 95,
                        animationDelay: ".4s",
                      }}
                    />
                  </div>
                  <div className="mt-8">
                    <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                      <span>Community Growth</span>

                      <span>94%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                      <div className="h-full w-[94%] rounded-full bg-primary  animate-progress transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="glass border-gradient animate-float absolute left-0
lg:-left-10 top-10 rounded-2xl px-5 py-4 shadow-premium"
              style={{
                animationDuration: "6s",
              }}
            >
              <p className="text-xs text-muted-foreground">New Ideas</p>

              <p className="font-bold">+128 Today</p>
            </div>
            <div
              className="glass border-gradient animate-float absolute -bottom-8 right-0
lg:-right-8 rounded-2xl px-5 py-4 shadow-premium"
              style={{
                animationDuration: "8s",
                animationDelay: "1s",
              }}
            >
              <p className="text-xs text-muted-foreground">CO₂ Saved</p>

              <p className="font-bold">18 Tons</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
