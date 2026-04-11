"use client";

import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedIdeas />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
