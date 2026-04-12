"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useCreateCheckout } from "../hooks/useCreateCheckout";

interface PaymentButtonProps {
  ideaId: string;
  price: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { button: "h-8 px-3", icon: "h-3 w-3", text: "text-xs" },
  md: { button: "h-10 px-4", icon: "h-4 w-4", text: "text-sm" },
  lg: { button: "h-12 px-6", icon: "h-5 w-5", text: "text-base" },
};

export function PaymentButton({
  ideaId,
  price,
  size = "md",
}: PaymentButtonProps) {
  const { isAuthenticated } = useAuth();
  const { mutateAsync, isPending } = useCreateCheckout();

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    await mutateAsync(ideaId);
  };

  return (
    <Button
      onClick={handlePurchase}
      disabled={isPending}
      className={sizeClasses[size].button}
    >
      {isPending ? (
        <>
          <Loader2 className={`${sizeClasses[size].icon} mr-2 animate-spin`} />
          Processing...
        </>
      ) : (
        <>
          <Zap className={`${sizeClasses[size].icon} mr-2`} />
          Unlock for ${price}
        </>
      )}
    </Button>
  );
}
