// ============ src/app/(dashboard)/member/page.tsx ============
"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lightbulb, Bookmark, Eye } from "lucide-react";
import { MemberStatusBadge } from "@/features/admin/components/members/MemberStatusBadge";

export default function MemberPage() {
  const { user, isLoading } = useAuth();

  // ================= Loading =================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // ================= Guard =================
  if (!user) return null;

  // ================= Stats (API-ready) =================
  const stats = [
    {
      title: "My Ideas",
      value: "0", // future: userStats.ideas
      icon: Lightbulb,
      href: "/member/idea",
      color: "text-yellow-500",
    },
    {
      title: "Bookmarks",
      value: "0", // future: userStats.bookmarks
      icon: Bookmark,
      href: "/member/bookmarks",
      color: "text-blue-500",
    },
    {
      title: "Profile Views",
      value: "0", // future: userStats.views
      icon: Eye,
      href: "/member/profile",
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= Header ================= */}
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6">
        <h1 className="text-3xl font-bold tracking-tight">Member Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {user.name}</p>
      </div>

      {/* ================= Stats ================= */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* ================= Profile ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium capitalize">
                {user.role.toLowerCase()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <MemberStatusBadge status={user.status} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
