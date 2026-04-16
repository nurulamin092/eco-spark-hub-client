"use client";

import { useState, useCallback } from "react";
import { BlogCard } from "./BlogCard";
import { BlogSkeleton } from "./BlogSkeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useBlogs } from "../hooks/useBlogs";

export function BlogList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useBlogs({
    page,
    limit: 9,
    sort: "recent",
  });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <BlogSkeleton count={6} />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load blogs. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const { data: blogs, meta } = data || {
    data: [],
    meta: { page: 1, limit: 9, total: 0, totalPages: 0 },
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border rounded-lg">
        No blogs found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
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
    </div>
  );
}
