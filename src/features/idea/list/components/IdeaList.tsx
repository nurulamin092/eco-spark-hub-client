// ============ src/features/idea/list/components/IdeaList.tsx ============
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IdeaCard } from "./IdeaCard";
import { IdeaFilters } from "./IdeaFilters";
import { IdeaSearch } from "./IdeaSearch";
import { IdeaSort } from "./IdeaSort";
import { useIdeas } from "../hooks/useIdeas";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

type SortType = "recent" | "top" | "commented" | "trending";

interface Filters {
  page: number;
  limit: number;
  search: string;
  category: string;
  sort: SortType;
}

function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function IdeaList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<Filters>(() => ({
    page: Number(searchParams.get("page") || 1),
    limit: 12,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sort: (searchParams.get("sort") as SortType) || "recent",
  }));

  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const { data, isLoading, isFetching, error } = useIdeas(queryFilters);

  const ideas = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 12, total: 0, totalPages: 0 };
  const hasMore = meta.page < meta.totalPages;

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.page > 1) params.set("page", String(filters.page));
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.sort !== "recent") params.set("sort", filters.sort);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  // ✅ Fixed: Intersection Observer with proper cleanup
  useEffect(() => {
    const currentTrigger = loadMoreTriggerRef.current;

    if (!currentTrigger || !hasMore || isFetching) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isFetching) {
          setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(currentTrigger);

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [hasMore, isFetching]);

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handleCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  }, []);

  const handleSort = useCallback((sort: SortType) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      page: 1,
      limit: 12,
      search: "",
      category: "",
      sort: "recent",
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isFetching) return;
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, isFetching]);

  if (error && filters.page === 1) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load ideas. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const isLoadingFirstPage = isLoading && filters.page === 1;
  const isFetchingMore = isFetching && filters.page > 1;

  return (
    <div className="space-y-6">
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <IdeaSearch value={filters.search} onChange={handleSearch} />
        <div className="flex gap-2">
          <IdeaFilters value={filters.category} onChange={handleCategory} />
          <IdeaSort value={filters.sort} onChange={handleSort} />
          {(filters.search ||
            filters.category ||
            filters.sort !== "recent") && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Result Count */}
      <div className="text-sm text-muted-foreground">
        {isLoadingFirstPage ? (
          "Loading ideas..."
        ) : (
          <>
            Showing {ideas.length} of {meta.total} ideas
          </>
        )}
      </div>

      {/* Loading State (First Load) */}
      {isLoadingFirstPage && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoadingFirstPage && ideas.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No ideas found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Ideas Grid */}
      {ideas.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>

          {/* Loading More Indicator */}
          {isFetchingMore && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center py-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}

          {hasMore && !isFetching && (
            <div ref={loadMoreTriggerRef} className="h-1" aria-hidden="true" />
          )}
        </>
      )}
    </div>
  );
}
