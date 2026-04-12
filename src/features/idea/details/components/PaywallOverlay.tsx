"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, DollarSign, Zap } from "lucide-react";
import { Idea } from "../../shared/types/idea.types";

interface PaywallOverlayProps {
  idea: Idea;
  onPurchase: () => void;
}

export function PaywallOverlay({ idea, onPurchase }: PaywallOverlayProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Card className="max-w-md p-6 text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium Content Locked</h3>
          <p className="text-muted-foreground mb-4">
            Get full access to this idea&apos;s complete solution,
            implementation guide, and resources.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">${idea.price}</span>
            <span className="text-muted-foreground">one-time payment</span>
          </div>
          <Button onClick={onPurchase} className="w-full gap-2">
            <Zap className="h-4 w-4" />
            Unlock for ${idea.price}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            One-time payment. Lifetime access.
          </p>
        </Card>
      </div>
    </div>
  );
}
