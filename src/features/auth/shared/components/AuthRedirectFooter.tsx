"use client";

import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { AuthRedirectFooterProps } from "../types/auth.types";

export function AuthRedirectFooter({
  text,
  linkText,
  href,
}: AuthRedirectFooterProps) {
  return (
    <CardFooter className="justify-center border-t pt-4">
      <p className="text-sm text-muted-foreground">
        {text}{" "}
        <Link href={href} className="text-primary font-medium hover:underline">
          {linkText}
        </Link>
      </p>
    </CardFooter>
  );
}
