"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { cn } from "@/lib/utils/cn";
import { NAV_LINKS } from "./nav.config";

function NavLinksComponent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="hidden items-center rounded-full border border-border/50 glass p-1 backdrop-blur-xl md:flex"
      aria-label="Main Navigation"
    >
      {NAV_LINKS.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export const NavLinks = memo(NavLinksComponent);
