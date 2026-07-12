// ============ src/app/(public)/page.tsx ============
import { Metadata } from "next";
import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";
import { Testimonials } from "@/components/home/Testimonials";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoCloud } from "@/components/home/LogoCloud";

export const metadata: Metadata = {
  title: "EcoSpark Hub | Share Sustainable Ideas",
  description:
    "Join a community of innovators working together to create a sustainable future. Share your eco-friendly ideas, get feedback, and make a real impact.",
  keywords: [
    "sustainability",
    "eco-friendly",
    "green ideas",
    "environment",
    "climate change",
  ],
  openGraph: {
    title: "EcoSpark Hub - Share Sustainable Ideas",
    description:
      "Join our community to share and discover sustainability ideas that make a difference",
    type: "website",
    url: "https://ecosparkhub.com",
    siteName: "EcoSpark Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoSpark Hub - Share Sustainable Ideas",
    description:
      "Join our community to share and discover sustainability ideas that make a difference",
  },
};

// Loading fallback components
function SectionSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-48 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-96 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden select-none">
      {/* Hero Section - No Suspense needed (static) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Grid */}
        <div className="bg-grid absolute inset-0 opacity-40" />

        {/* Glow 1 */}
        <div className="animate-glow absolute left-1/4 top-0 h-105 w-105 rounded-full bg-primary/10 blur-[120px]" />

        {/* Glow 2 */}
        <div className="animate-glow absolute right-0 top-75 h-95 w-95 rounded-full bg-emerald-400/10 blur-[120px]" />

        {/* Glow 3 */}
        <div className="animate-glow absolute bottom-0 left-1/3 h-125 w-125 rounded-full bg-primary/5 blur-[160px]" />
      </div>
      <HeroSection />

      <LogoCloud />

      {/* Stats Section - Static */}
      <StatsSection />

      {/* Featured Ideas - With Suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedIdeas />
      </Suspense>

      {/* Categories Section - With Suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <CategoriesSection />
      </Suspense>

      {/* Testimonials - With Suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>

      {/* Newsletter Section - No Suspense needed */}
      <NewsletterSection />
    </main>
  );
}
