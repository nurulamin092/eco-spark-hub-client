import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";
import { Testimonials } from "@/components/home/Testimonials";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

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
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedIdeas />
      <CategoriesSection />
      <Testimonials />
      <NewsletterSection />
    </main>
  );
}
