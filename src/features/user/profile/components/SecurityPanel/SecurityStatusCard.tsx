"use client";

import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  Smartphone,
  Monitor,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SecurityStatusCard() {
  const securityScore = 85;

  return (
    <Card
      className="
        glass
        border-gradient
        overflow-hidden
        rounded-3xl
        shadow-card
      "
    >
      <CardContent className="relative p-8">
        {/* Background Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-primary/10
            blur-[120px]
          "
        />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <ShieldCheck className="h-4 w-4" />
                Security Status
              </div>

              <h2 className="text-3xl font-bold tracking-tight">
                Your account is protected
              </h2>

              <p className="mt-2 text-muted-foreground">
                Review your security settings and keep your EcoSpark Hub account
                safe.
              </p>
            </div>

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
              "
            >
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Security Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Security Score</span>

              <span className="text-xl font-bold text-primary">
                {securityScore}%
              </span>
            </div>

            <Progress value={securityScore} className="h-2" />
          </div>

          {/* Status Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />

                <span className="font-semibold">Password</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Strong password
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />

                <span className="font-semibold">Two-Factor Auth</span>
              </div>

              <p className="text-sm text-muted-foreground">Available soon</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />

                <span className="font-semibold">Active Sessions</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Session management coming soon
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
