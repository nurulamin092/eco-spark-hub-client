"use client";

import { History, Clock3, Globe, ShieldCheck, FileClock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function LoginActivityCard() {
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
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Login Activity
        </CardTitle>

        <CardDescription>
          Review your recent account sign in history.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Latest Login */}
        <div
          className="
            flex
            items-start
            justify-between
            rounded-2xl
            border
            border-primary/20
            bg-primary/5
            p-5
          "
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />

              <span className="font-semibold">Latest Successful Login</span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Just now
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Bangladesh • Chrome • macOS
              </div>
            </div>
          </div>

          <span
            className="
              rounded-full
              bg-emerald-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-600
            "
          >
            Success
          </span>
        </div>

        {/* Coming Soon */}
        <div
          className="
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-dashed
            p-5
            opacity-75
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
              bg-muted
            "
          >
            <FileClock className="h-5 w-5" />
          </div>

          <div>
            <h4 className="font-medium">Detailed Login History</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Your recent login attempts, locations, IP addresses, browsers and
              devices will appear here once activity tracking is enabled.
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-full rounded-xl" disabled>
          View Full Activity
          <span className="ml-2 text-xs text-muted-foreground">
            Coming Soon
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
