// ============ src/app/(dashboard)/member/page.tsx ============
"use client";

import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lightbulb, Bookmark, Eye } from "lucide-react";
import Link from "next/link";

export default function MemberPage() {
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
      title: "Profile Views",
      value: "0",
      icon: Eye,
      href: "/member/profile",
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6">
        <h1 className="text-3xl font-bold tracking-tight">Member Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your member dashboard, {user.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
