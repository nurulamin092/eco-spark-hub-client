"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteScrollProps {
  children: ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadingComponent?: ReactNode;
  endComponent?: ReactNode;
  threshold?: number;
}

export function InfiniteScroll({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  loadingComponent,
  endComponent,
  threshold = 100,
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore],
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0,
      rootMargin: `${threshold}px`,
    });
    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [handleIntersect, threshold]);

  return (
    <div className="space-y-4">
      {children}
      <div ref={sentinelRef} className="py-4 text-center">
        {isLoading &&
          (loadingComponent || (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ))}
        {!hasMore &&
          !isLoading &&
          (endComponent || (
            <p className="text-sm text-muted-foreground py-4">
              You&apos;ve reached the end
            </p>
          ))}
      </div>
    </div>
  );
}
