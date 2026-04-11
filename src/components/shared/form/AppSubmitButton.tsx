"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AppSubmitButtonProps {
  isPending: boolean;
  text: string;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
}

export function AppSubmitButton({
  isPending,
  text,
  disabled,
  loadingText = "Loading...",
  className,
}: AppSubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`w-full ${className}`}
      disabled={isPending || disabled}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
