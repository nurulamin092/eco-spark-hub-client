// ============ src/features/payment/components/PaymentStatusBadge.tsx ============
"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";

interface PaymentStatusBadgeProps {
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  className?: string;
}

const statusConfig = {
  PENDING: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  SUCCESS: {
    label: "Success",
    variant: "default" as const,
    icon: CheckCircle,
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  FAILED: {
    label: "Failed",
    variant: "destructive" as const,
    icon: XCircle,
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  REFUNDED: {
    label: "Refunded",
    variant: "outline" as const,
    icon: RefreshCw,
    className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
};

export function PaymentStatusBadge({
  status,
  className,
}: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} gap-1 ${className || ""}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
