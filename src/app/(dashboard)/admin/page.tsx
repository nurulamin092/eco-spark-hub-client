// ============ src/app/(dashboard)/admin/page.tsx ============
"use client";

import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { AdminDashboardShell } from "@/features/admin/components/dashboard/AdminDashboardShell";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN"))
    return null;

  return <AdminDashboardShell />;
}
