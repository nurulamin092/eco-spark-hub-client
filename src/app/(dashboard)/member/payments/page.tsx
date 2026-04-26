// ============ src/app/(dashboard)/member/payments/page.tsx (Updated) ============
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";
import { PaymentHistory } from "@/features/payment/components/PaymentHistory";
import { PaymentSummary } from "@/features/payment/components/PaymentSummary";

export const metadata: Metadata = {
  title: "Payments | Member Dashboard",
  description: "View your payment history and transaction details",
};

export default async function PaymentsPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-muted-foreground">
          View all your transactions and purchases
        </p>
      </div>

      <PaymentSummary />

      <div>
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <PaymentHistory />
      </div>
    </div>
  );
}
