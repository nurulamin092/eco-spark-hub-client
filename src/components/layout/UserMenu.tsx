"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { ADMIN_ROLES } from "./nav.config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { Home, LogOut, Settings, User, ArrowRight } from "lucide-react";

function UserMenuComponent() {
  const { user, logout } = useAuth();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link href="/login">
          <Button variant="ghost" className="rounded-full px-5">
            Sign In
          </Button>
        </Link>

        <Link href="/register">
          <Button className="rounded-full px-6 shadow-card">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  const initials = user.name?.charAt(0).toUpperCase() ?? "U";

  const isAdmin = ADMIN_ROLES.includes(user.role);

  async function handleLogout() {
    setLoading(true);

    try {
      await logout();

      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            relative
            rounded-full
            transition-transform
            duration-300
            hover:scale-105
            focus:outline-none
          "
          aria-label="Open user menu"
        >
          <Avatar className="h-10 w-10 border border-border shadow-card">
            <AvatarImage src={user.image || undefined} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {/* Online indicator */}
          <span
            className="
              absolute
              bottom-0
              right-0
              h-3
              w-3
              rounded-full
              border-2
              border-background
              bg-green-500
            "
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="glass mt-3 w-60 rounded-2xl p-2"
      >
        <div className="px-3 py-2">
          <p className="font-medium">{user.name}</p>

          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        {isAdmin ? (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Settings className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/member/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={loading}
          className="text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />

          {loading ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const UserMenu = memo(UserMenuComponent);
