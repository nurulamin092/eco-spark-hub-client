"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus } from "lucide-react";
import { MyIdeaCard } from "./MyIdeaCard";
import { MyIdeasFilters } from "./MyIdeasFilters";
import { useMyIdeas } from "../hooks/useMyIdeas";
import { IdeaStatus } from "../types/my-ideas.types";

export function MyIdeasList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<IdeaStatus | "ALL">("ALL");
  const limit = 10;

  const statusFilter = status === "ALL" ? undefined : status;

  const { data, isLoading, error, refetch } = useMyIdeas({
    page,
    limit,
    search: search || undefined,
    status: statusFilter,
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading && page === 1) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load your ideas. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const { data: ideas, meta } = data || {
    data: [],
    meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Ideas</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track your submitted ideas
          </p>
        </div>
        <Link href="/member/ideas/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Idea
          </Button>
        </Link>
      </div>

      <MyIdeasFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {ideas.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No ideas found</p>
          <Link href="/member/ideas/create">
            <Button variant="outline">Create Your First Idea</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {ideas.map((idea) => (
              <MyIdeaCard key={idea.id} idea={idea} onRefresh={handleRefresh} />
            ))}
          </div>

          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page <= 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page >= meta.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}  
    </div>
  );
}
