"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorRetryProps {
  error?: Error | string | null;
  onRetry: () => void;
  title?: string;
  message?: string;
}

export function ErrorRetry({
  error,
  onRetry,
  title,
  message,
}: ErrorRetryProps) {
  const errorMessage =
    message ||
    (typeof error === "string" ? error : error?.message) ||
    "Something went wrong";

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {title || "Failed to load data"}
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        {errorMessage}
      </p>
      <Button onClick={onRetry} variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}
