"use client";

import { CheckCircle } from "lucide-react";

interface NewsletterSuccessProps {
  email: string;
}

export function NewsletterSuccess({ email }: NewsletterSuccessProps) {
  return (
    <div className="text-center space-y-3">
      <div className="flex justify-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h3 className="text-lg font-semibold">Successfully Subscribed!</h3>
      <p className="text-sm text-muted-foreground">
        Thank you for subscribing with <strong>{email}</strong>
      </p>
      <p className="text-xs text-muted-foreground">
        You&apos;ll receive updates about new ideas and sustainability tips.
      </p>
    </div>
  );
}
