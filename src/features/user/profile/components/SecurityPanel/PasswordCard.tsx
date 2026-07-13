"use client";

import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PasswordCard() {
  return (
    <Card className="glass border-gradient rounded-3xl shadow-card">
      <CardContent className="p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold">Change Password</h3>

                <p className="text-muted-foreground">
                  Update your password regularly to keep your account secure.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 p-4">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />

                <div>
                  <p className="font-medium">Strong Security</p>

                  <p className="text-sm text-muted-foreground">
                    Password is encrypted.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border/60 p-4">
                <KeyRound className="h-5 w-5 text-primary" />

                <div>
                  <p className="font-medium">Recommended</p>

                  <p className="text-sm text-muted-foreground">
                    Change every 3–6 months.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0">
            <Link href="/member/change-password">
              <Button size="lg" className="rounded-xl px-6 shadow-card">
                Change Password
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
