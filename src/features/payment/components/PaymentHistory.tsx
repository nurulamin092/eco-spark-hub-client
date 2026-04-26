// ============ src/features/payment/components/PaymentHistory.tsx ============
"use client";

import { usePayment } from "../hooks/usePayment";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const statusConfig = {
  PENDING: { label: "Pending", variant: "warning", icon: Clock },
  SUCCESS: { label: "Success", variant: "success", icon: CheckCircle },
  FAILED: { label: "Failed", variant: "destructive", icon: XCircle },
  REFUNDED: { label: "Refunded", variant: "secondary", icon: CreditCard },
} as const;

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
}

export function PaymentHistory() {
  const { data: payments, isLoading, error } = usePayment();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load payment history. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!payments?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
          <p className="text-muted-foreground">
            You haven&apos;t made any purchases yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => {
        const StatusIcon = statusConfig[payment.status]?.icon || Clock;

        return (
          <Card key={payment.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Section - Idea Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(payment.createdAt)}
                    </span>
                  </div>

                  {payment.idea ? (
                    <Link href={`/ideas/${payment.idea.id}`} className="group">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {payment.idea.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {payment.idea.description}
                      </p>
                    </Link>
                  ) : (
                    <h3 className="font-semibold text-lg">
                      Idea #{payment.ideaId}
                    </h3>
                  )}
                </div>

                {/* Right Section - Payment Info */}
                <div className="flex flex-col items-end gap-2">
                  <div className="text-2xl font-bold">
                    {formatAmount(payment.amount, payment.currency)}
                  </div>

                  <Badge
                    variant={
                      payment.status === "SUCCESS"
                        ? "default"
                        : payment.status === "PENDING"
                          ? "secondary"
                          : payment.status === "FAILED"
                            ? "destructive"
                            : "outline"
                    }
                    className="capitalize"
                  >
                    {payment.status.toLowerCase()}
                  </Badge>

                  {payment.transactionId && (
                    <p className="text-xs text-muted-foreground">
                      TXN: {payment.transactionId.slice(0, 8)}...
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Payment via {payment.provider || "Stripe"}
                </span>
                {payment.status === "SUCCESS" && payment.idea && (
                  <Link href={`/ideas/${payment.idea.id}`}>
                    <button className="text-sm text-primary hover:underline flex items-center gap-1">
                      View Idea <ExternalLink className="h-3 w-3" />
                    </button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
