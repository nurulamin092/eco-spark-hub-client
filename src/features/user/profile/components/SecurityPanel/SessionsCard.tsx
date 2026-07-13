"use client";

import { Monitor, Smartphone, Globe, LogOut } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function SessionsCard() {
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
          <Monitor className="h-5 w-5 text-primary" />
          Active Sessions
        </CardTitle>

        <CardDescription>
          View devices currently signed in to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Current Device */}
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
          <div className="flex gap-4">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-primary/10
              "
            >
              <Monitor className="h-5 w-5 text-primary" />
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold">Current Device</h4>

              <p className="text-sm text-muted-foreground">macOS • Chrome</p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                Bangladesh
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
            Active
          </span>
        </div>

        {/* Placeholder */}
        <div
          className="
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-dashed
            p-5
            opacity-70
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
            <Smartphone className="h-5 w-5" />
          </div>

          <div>
            <h4 className="font-medium">More devices will appear here</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Once multi-device session tracking is enabled, you can manage and
              revoke individual sessions from here.
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-full rounded-xl" disabled>
          <LogOut className="mr-2 h-4 w-4" />
          Logout Other Devices
          <span className="ml-2 text-xs text-muted-foreground">
            Coming Soon
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
