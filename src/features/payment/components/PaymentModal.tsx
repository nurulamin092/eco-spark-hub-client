"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Zap, Shield, CreditCard } from "lucide-react";
import { PaymentButton } from "./PaymentButton";

interface PaymentModalProps {
  ideaId: string;
  ideaTitle: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({
  ideaId,
  ideaTitle,
  price,
  isOpen,
  onClose,
}: PaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Unlock Premium Content
          </DialogTitle>
          <DialogDescription className="text-center">
            Get full access to &quot;{ideaTitle}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Price</span>
              <span className="text-2xl font-bold">${price}</span>
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span>Complete solution & implementation guide</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-primary" />
                <span>Secure payment via Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Lifetime access after purchase</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2">
          <PaymentButton ideaId={ideaId} price={price} size="md" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-full"
          >
            Maybe later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
