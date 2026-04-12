"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Bookmark,
  Eye,
  MessageCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";

function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function BookmarkList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useBookmarks({ page, limit });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load bookmarks. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const { data: bookmarks, meta } = data || {
    data: [],
    meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">No bookmarks yet</h3>
        <p className="text-muted-foreground mb-4">
          Save ideas you&apos;re interested in by clicking the bookmark button.
        </p>
        <Link href="/ideas">
          <Button>Explore Ideas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Bookmarks</h1>
          <p className="text-muted-foreground text-sm">
            {meta.total} saved {meta.total === 1 ? "idea" : "ideas"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {bookmarks.map(({ idea }) => (
          <Card key={idea.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: idea.category.color || "#888" }}
                  >
                    {idea.category.name}
                  </span>
                </div>
              </div>
              <Link href={`/ideas/${idea.id}`}>
                <CardTitle className="hover:text-primary transition-colors line-clamp-1">
                  {idea.title}
                </CardTitle>
              </Link>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground line-clamp-2">
                {idea.description}
              </p>

              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span>{formatNumber(idea.upvoteCount)}</span>
                  <ArrowDown className="h-4 w-4 text-red-500 ml-2" />
                  <span>{formatNumber(idea.downvoteCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{formatNumber(idea.commentCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{formatNumber(idea.viewCount)}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs text-muted-foreground">
                  Saved {new Date(idea.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/ideas/${idea.id}`}>
                  <Button size="sm" variant="outline">
                    View Idea
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
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
