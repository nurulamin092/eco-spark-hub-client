"use client";

import { Smartphone, ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function TwoFactorCard() {
  return (
    <Card
      className="
        glass
        border-gradient
        rounded-3xl
        shadow-card
      "
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Two-Factor Authentication
            </CardTitle>

            <CardDescription className="mt-2">
              Add an extra layer of security to your account.
            </CardDescription>
          </div>

          <Badge variant="secondary">Coming Soon</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status */}

        <div
          className="
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-amber-500/20
            bg-amber-500/5
            p-5
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-amber-500/10
            "
          >
            <ShieldAlert className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <h4 className="font-semibold">
              Two-Factor Authentication is disabled
            </h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Enable two-factor authentication to significantly improve your
              account security.
            </p>
          </div>
        </div>

        {/* Benefits */}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />

              <span className="font-semibold">Better Protection</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Prevent unauthorized access even if your password is compromised.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />

              <span className="font-semibold">Authenticator Apps</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Support for Google Authenticator, Microsoft Authenticator and
              Authy.
            </p>
          </div>
        </div>

        {/* CTA */}

        <Button variant="outline" className="w-full rounded-xl" disabled>
          Enable Two-Factor Authentication
          <ArrowRight className="ml-2 h-4 w-4" />
          <span className="ml-2 text-xs text-muted-foreground">
            Coming Soon
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
