// ============ src/app/(dashboard)/dashboard/page.tsx ============
"use client";

import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lightbulb, TrendingUp, Eye, Bookmark } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    {
      title: "My Ideas",
      value: "0",
      icon: Lightbulb,
      href: "/member/ideas",
      color: "text-yellow-500",
    },
    {
      title: "Bookmarks",
      value: "0",
      icon: Bookmark,
      href: "/member/bookmarks",
      color: "text-blue-500",
    },
    {
      title: "Total Views",
      value: "0",
      icon: TrendingUp,
      href: "#",
      color: "text-green-500",
    },
    {
      title: "Profile",
      value: "Edit",
      icon: Eye,
      href: "/member/profile",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your recent activities on EcoSpark Hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No recent activities to show
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
