// ============ src/features/payment/components/PaymentSummary.tsx ============
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePayment } from "../hooks/usePayment";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react";

export function PaymentSummary() {
  const { data: payments, isLoading } = usePayment();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  const totalSpent =
    payments?.reduce(
      (sum, p) => (p.status === "SUCCESS" ? sum + p.amount : sum),
      0,
    ) ?? 0;

  const totalPurchases =
    payments?.filter((p) => p.status === "SUCCESS").length ?? 0;
  const activePurchases =
    payments?.filter(
      (p) =>
        p.status === "SUCCESS" &&
        (!p.accessExpiresAt || new Date(p.accessExpiresAt) > new Date()),
    ).length ?? 0;

  const summaryCards = [
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Purchases",
      value: totalPurchases.toString(),
      icon: ShoppingBag,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Access",
      value: activePurchases.toString(),
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryCards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
