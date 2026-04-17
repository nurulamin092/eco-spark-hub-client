"use client";

import { NewsletterForm } from "@/features/newsletter/components/NewsletterForm";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-20 bg-linear-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm mb-6">
            <Mail className="h-4 w-4" />
            <span>Stay Updated</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get the Latest Sustainability Ideas
          </h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter and never miss out on innovative ideas,
            success stories, and community updates.
          </p>
          <NewsletterForm variant="hero" />
          <p className="text-xs text-white/60 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
