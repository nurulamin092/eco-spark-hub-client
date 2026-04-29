"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { Zap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "bg-background/80 backdrop-blur border-b"
          : "bg-background border-b",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">EcoSpark</span>
        </Link>

        {/* Nav */}
        <NavLinks />

        {/* Right */}
        <div className="flex items-center gap-2">
          {user && (
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          )}

          <UserMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
