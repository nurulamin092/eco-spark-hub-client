"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { ADMIN_ROLES } from "./nav.config";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, Home } from "lucide-react";

function UserMenuComponent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="hidden md:flex gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
    );
  }

  const initials = user.name?.charAt(0).toUpperCase() || "U";
  const isAdmin = ADMIN_ROLES.includes(user.role);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full focus:outline-none"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
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
