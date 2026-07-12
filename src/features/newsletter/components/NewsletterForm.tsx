"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2 } from "lucide-react";
import { useSubscribeNewsletter } from "../hooks/useSubscribeNewsletter";
import { NewsletterSuccess } from "./NewsletterSuccess";

interface NewsletterFormProps {
  variant?: "default" | "footer" | "hero";
  className?: string;
}

const variantStyles = {
  default: {
    container: "max-w-md mx-auto",
    input: "glass border-border/50",
    button: "",
  },
  footer: {
    container: "w-full",
    input: "glass border-border/50",
    button: "",
  },
  hero: {
    container: "max-w-xl mx-auto",
    input: "glass border-border/50",
    button:
      "group transition-all duration-300 hover:-translate-y-0.5 text-primary-foreground hover:bg-primary/90",
  },
};

export function NewsletterForm({
  variant = "default",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { mutateAsync, isPending } = useSubscribeNewsletter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;

      try {
        await mutateAsync(email);
        setSubmittedEmail(email);
        setIsSuccess(true);
        setEmail("");
      } catch {
        // Error handled by mutation
      }
    },
    [email, mutateAsync],
  );

  if (isSuccess) {
    return <NewsletterSuccess email={submittedEmail} />;
  }

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
            className={`h-12 rounded-xl pl-10 ${styles.input}`}
            aria-label="Email address for newsletter"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className={`
h-12
rounded-xl
px-6
${styles.button}
`}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-3">
        No spam, unsubscribe anytime.
      </p>
    </div>
  );
}
