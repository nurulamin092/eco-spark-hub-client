"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionCard } from "./SessionCard";
import { RevokeAllButton } from "./RevokeAllButton";
import { useSessions } from "../hooks/useSessions";

export function SessionsList() {
  const { data, isLoading, error } = useSessions();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load sessions. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const { sessions, currentSessionId } = data || {
    sessions: [],
    currentSessionId: "",
  };
  const otherSessionsCount = sessions.filter(
    (s) => s.id !== currentSessionId,
  ).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              You are currently logged in on {sessions.length} device
              {sessions.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          {otherSessionsCount > 0 && <RevokeAllButton />}
        </div>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No active sessions found
          </p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                isCurrent={session.id === currentSessionId}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
