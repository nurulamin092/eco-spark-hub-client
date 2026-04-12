"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IdeaCard } from "./IdeaCard";
import { IdeaFilters } from "./IdeaFilters";
import { IdeaSearch } from "./IdeaSearch";
import { IdeaSort } from "./IdeaSort";

import { useIdeas } from "../hooks/useIdeas";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// ✅ Types
type IdeaSortType = "recent" | "top" | "commented" | "trending";

interface Filters {
  page: number;
  limit: number;
  search: string;
  category: string;
  sort: IdeaSortType;
}

// ✅ Debounce Hook
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

  // ✅ Initial state from URL
  const [filters, setFilters] = useState<Filters>(() => ({
    page: Number(searchParams.get("page") || 1),
    limit: 12,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sort: (searchParams.get("sort") as IdeaSortType) || "recent",
  }));

  // ✅ Debounced search
  const debouncedSearch = useDebounce(filters.search, 500);

  // ✅ Memoized query filters
  const queryFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  // ✅ Data fetching
  const { data, isLoading, error } = useIdeas(queryFilters);

  // ✅ URL Sync
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.page > 1) params.set("page", String(filters.page));
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.sort !== "recent") params.set("sort", filters.sort);

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  // ✅ Handlers
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  };

  const handleSort = (sort: IdeaSortType) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  };

  // ✅ Loading UI
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load ideas. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const { data: ideas, meta } = data || {
    data: [],
    meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
  };

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <IdeaSearch value={filters.search} onChange={handleSearch} />

        <div className="flex gap-2">
          <IdeaFilters value={filters.category} onChange={handleCategory} />
          <IdeaSort value={filters.sort} onChange={handleSort} />
        </div>
      </div>

      {/* 📊 Result Count */}
      <div className="text-sm text-muted-foreground">
        Showing {ideas.length} of {meta.total} ideas
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No ideas found. Try adjusting your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}

      {meta.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
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
    </div>
  );
}
