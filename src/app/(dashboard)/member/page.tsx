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
import { Loader2 } from "lucide-react";

export default function MemberPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6">
        <h1 className="text-3xl font-bold tracking-tight">Member Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your member dashboard, {user.name}
        </p>
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
