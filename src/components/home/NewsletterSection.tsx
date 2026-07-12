"use client";

import { NewsletterForm } from "@/features/newsletter/components/NewsletterForm";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section
      className="relative
    overflow-hidden
    py-24
    lg:py-32"
    >
      <div className="container mx-auto px-4">
        <div
          className=" glass
            relative
            overflow-hidden
            rounded-3xl
            border
            border-border/60
            px-8
            py-12
            shadow-card
            lg:px-16
            lg:py-16"
        >
          <div
            aria-hidden="true"
            className="
    pointer-events-none
absolute
inset-0
flex
items-center
justify-center
  "
          >
            <div
              className="
      h-96
      w-96
      rounded-full
      bg-primary/10
      blur-[140px]
    "
            />
          </div>
          <div
            className=" relative
z-10
glass
inline-flex
items-center
gap-2
rounded-full
border
border-primary/20
px-4
py-2
text-sm
font-medium
text-primary"
          >
            <Mail className="h-4 w-4" />
            <span>Newsletter</span>
          </div>
          <h2
            className="relative
z-10
mt-6
text-4xl
font-extrabold
tracking-tight
md:text-5xl"
          >
            Get the Latest Sustainability Ideas
          </h2>
          <p
            className="relative
z-10
mt-5
max-w-2xl
text-lg
leading-8
text-muted-foreground/80"
          >
            Subscribe to our newsletter and never miss out on innovative ideas,
            success stories, and community updates.
          </p>
          <div className="relative z-10">
            <NewsletterForm variant="hero" />
          </div>
          <p
            className="relative
z-10
mt-4
text-xs
text-muted-foreground"
          >
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
