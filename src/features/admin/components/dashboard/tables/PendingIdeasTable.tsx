// ============ src/features/admin/components/dashboard/tables/PendingIdeasTable.tsx ============
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PendingIdeasRow } from "./PendingIdeasRow";
import type { PendingIdea } from "../../../types/admin.types";

interface PendingIdeasTableProps {
  ideas: PendingIdea[];
  isLoading?: boolean;
  onRefresh: () => void;
}

export function PendingIdeasTable({
  ideas,
  isLoading,
  onRefresh,
}: PendingIdeasTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paginatedIdeas = ideas.slice(0, page * pageSize);
  const hasMore = paginatedIdeas.length < ideas.length;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (ideas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Review</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No pending ideas to review
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Review ({ideas.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {paginatedIdeas.map((idea) => (
          <PendingIdeasRow
            key={idea.id}
            idea={idea}
            onActionComplete={onRefresh}
          />
        ))}
        {hasMore && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            className="w-full"
          >
            Load More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
