// src/app/(dashboard)/admin/payments/page.tsx
import { AdminPaymentList } from "@/features/payment/components/AdminPaymentList";
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Payment Approvals | Admin Dashboard",
  description: "Review and manage pending payments",
};

export default async function AdminPaymentsPage() {
  await requireAuth();

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <AdminPaymentList />
    </div>
  );
}
