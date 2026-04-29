"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav.config";
import { memo } from "react";

function NavLinksComponent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-all ${
            isActive(link.href)
              ? "text-primary border-b-2 border-primary pb-0.5"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export const NavLinks = memo(NavLinksComponent);
