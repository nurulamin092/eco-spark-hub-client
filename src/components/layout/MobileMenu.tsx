"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "./nav.config";
import { Menu } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <div className="flex flex-col gap-4 mt-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
