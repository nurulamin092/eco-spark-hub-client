// ============ src/features/idea/my-ideas/components/MyIdeasList.tsx ============
"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus } from "lucide-react";
import { MyIdeaCard } from "./MyIdeaCard";
import { MyIdeasFilters } from "./MyIdeasFilters";
import { useMyIdeas } from "../hooks/useMyIdeas";
import { IdeaStatus } from "../types/my-ideas.types";


function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function MyIdeasList() {
  const router = useRouter();
  const searchParams = useSearchParams();

 
  const [page, setPage] = useState(() => Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [status, setStatus] = useState<IdeaStatus | "ALL">(
    () => (searchParams.get("status") as IdeaStatus | "ALL") || "ALL",
  );

  const limit = 10;

  const debouncedSearch = useDebounce(search, 500);

 
  const filters = useMemo(
    () => ({
      page,
      limit,
      search: debouncedSearch || undefined,
      status: status === "ALL" ? undefined : status,
    }),
    [page, debouncedSearch, status],
  );

 
  const { data, isLoading, error, refetch, isFetching } = useMyIdeas(filters);

 
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    if (status !== "ALL") params.set("status", status);

    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/member/ideas${newUrl}`, { scroll: false });
  }, [page, search, status, router]);

  const handleStatusChange = useCallback((newStatus: IdeaStatus | "ALL") => {
    setStatus(newStatus);
    setPage(1); // ✅ Reset to first page on filter change
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1); // ✅ Reset to first page on search
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Loading state (first load)
  if (isLoading && page === 1) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  // Error state
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

  const isLoadingMore = isFetching && page > 1;

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Filters */}
      <MyIdeasFilters
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Loading more indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        </div>
      )}

      {/* Empty state */}
      {!isLoadingMore && ideas.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No ideas found</p>
          <Link href="/member/ideas/create">
            <Button variant="outline">Create Your First Idea</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Ideas list */}
          <div className="space-y-4">
            {ideas.map((idea) => (
              <MyIdeaCard key={idea.id} idea={idea} onRefresh={handleRefresh} />
            ))}
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page <= 1 || isFetching}
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
                disabled={meta.page >= meta.totalPages || isFetching}
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
