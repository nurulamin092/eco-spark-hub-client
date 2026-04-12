"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Laptop,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  X,
  Loader2,
} from "lucide-react";
import { Session } from "../types/session.types";
import { useRevokeSession } from "../hooks/useRevokeSession";

interface SessionCardProps {
  session: Session;
  isCurrent: boolean;
}

function getDeviceIcon(userAgent: string | null) {
  if (!userAgent) return <Globe className="h-5 w-5" />;

  const ua = userAgent.toLowerCase();
  if (ua.includes("mobile")) return <Smartphone className="h-5 w-5" />;
  if (ua.includes("tablet")) return <Tablet className="h-5 w-5" />;
  if (ua.includes("mac") || ua.includes("windows") || ua.includes("linux")) {
    return <Laptop className="h-5 w-5" />;
  }
  return <Monitor className="h-5 w-5" />;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SessionCard({ session, isCurrent }: SessionCardProps) {
  const { mutateAsync, isPending } = useRevokeSession();

  const handleRevoke = async () => {
    if (confirm("Are you sure you want to revoke this session?")) {
      await mutateAsync(session.id);
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1">{getDeviceIcon(session.userAgent)}</div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">
                  {session.userAgent?.split(" ").slice(0, 2).join(" ") ||
                    "Unknown Device"}
                </span>
                {isCurrent && (
                  <Badge variant="default" className="text-xs">
                    Current Session
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                {session.ipAddress && <p>IP: {session.ipAddress}</p>}
                <p>Last active: {formatDate(session.updatedAt)}</p>
                <p>Created: {formatDate(session.createdAt)}</p>
              </div>
            </div>
          </div>

          {!isCurrent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRevoke}
              disabled={isPending}
              className="text-destructive hover:text-destructive"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
