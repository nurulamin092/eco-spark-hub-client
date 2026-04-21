import { AuditLogTable } from "@/features/audit/components/AuditLogTable";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Audit Logs | Admin Dashboard",
  description: "View system audit logs",
};

export default async function AuditLogsPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground">
          Track all actions performed by users in the system
        </p>
      </div>
      <AuditLogTable />
    </div>
  );
}
