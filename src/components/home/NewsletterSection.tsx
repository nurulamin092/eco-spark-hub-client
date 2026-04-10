"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/base";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      await apiClient.post("/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      setSubscribed(true);
      toast.success("Successfully subscribed!");
      setEmail("");
    },
    onError: () => toast.error("Failed to subscribe. Try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) mutate(email);
  };

  if (subscribed) {
    return (
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thanks for subscribing!</h3>
          <p className="text-muted-foreground">
            You&lsquo;ll receive updates on new ideas.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-8">
          Get the latest sustainability ideas and updates.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
