import { ReportList } from "@/features/report/components/ReportList";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Reports | Admin Dashboard",
  description: "Manage user reports",
};

export default async function ReportsPage() {
  await requireAdmin();
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Review and manage user reports</p>
      </div>
      <ReportList />
    </div>
  );
}
