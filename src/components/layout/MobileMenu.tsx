"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { Menu, Leaf, ArrowRight } from "lucide-react";

import { NAV_LINKS } from "./nav.config";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/features/auth/shared/hooks/useAuth";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { user } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[320px] border-l bg-background/95 backdrop-blur-xl"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b pb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold">EcoSpark</h2>

              <p className="text-xs text-muted-foreground">
                Sustainable Ideas
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="mt-auto border-t pt-6">
            {!user ? (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                >
                  <Button className="w-full rounded-xl">
                    Get Started

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full rounded-xl">
                  Dashboard
                </Button>
              </Link>
            )}

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Build a greener future 🌱
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}