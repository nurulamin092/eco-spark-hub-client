"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Leaf } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

import { Button } from "@/components/ui/button";

import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "glass border-gradient flex h-18 items-center justify-between rounded-2xl px-6 transition-all duration-500 ease-out",
            scrolled && "shadow-card",
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                bg-primary
                text-primary-foreground
                shadow-card
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:rotate-12
              "
            >
              <Leaf className="h-5 w-5" />
            </div>

            <div className="leading-none">
              <p className="text-lg font-bold tracking-tight">EcoSpark</p>

              <p className="text-xs text-muted-foreground/70">
                Sustainable Ideas Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Right */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="
                  glass
                  rounded-full
                  border
                  border-border/50
                  transition-all
                  duration-300
                  hover:scale-105
                "
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>
            )}

            <UserMenu />

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
