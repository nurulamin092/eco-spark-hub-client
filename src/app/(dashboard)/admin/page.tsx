import { AdminDashboardShell } from "@/features/admin/components/dashboard/AdminDashboardShell";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Admin Dashboard | EcoSpark Hub",
  description: "Manage your platform from the admin dashboard",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of platform statistics and activities
        </p>
      </div>
      <AdminDashboardShell />
    </div>
  );
}
