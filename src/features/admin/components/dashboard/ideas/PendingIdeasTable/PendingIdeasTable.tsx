"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import { PendingIdeasRow } from "./PendingIdeasRow";
import { PendingIdea } from "@/features/admin/types/admin.types";

interface PendingIdeasTableProps {
  ideas: PendingIdea[];
  isLoading?: boolean;
  onRefresh: () => void;
}

const PAGE_SIZE = 5;

export function PendingIdeasTable({
  ideas,
  isLoading,
  onRefresh,
}: PendingIdeasTableProps) {
  const [page, setPage] = useState(1);

  const paginatedIdeas = ideas.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedIdeas.length < ideas.length;

  const handleLoadMore = useCallback(() => setPage((p) => p + 1), []);

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
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            Pending Review
          </CardTitle>
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
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          Pending Review ({ideas.length})
        </CardTitle>
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
            onClick={handleLoadMore}
            className="w-full"
          >
            Load More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
