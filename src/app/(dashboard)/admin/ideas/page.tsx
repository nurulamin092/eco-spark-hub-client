// ============ src/app/(dashboard)/admin/ideas/page.tsx ============
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";
import { AllIdeasTable } from "@/features/admin/components/ideas/AllIdeasTable";

export const metadata: Metadata = {
  title: "All Ideas | Admin Dashboard",
  description: "Manage all ideas on the platform",
};

export default async function AdminAllIdeasPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Ideas</h1>
        <p className="text-muted-foreground">
          View and manage all submitted ideas
        </p>
      </div>
      <AllIdeasTable />
    </div>
  );
}
