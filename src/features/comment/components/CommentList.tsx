"use client";

import { useState, useCallback, useMemo } from "react";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, MessageCircle } from "lucide-react";
import { useComments } from "../hooks/useComments";
import type { Comment } from "../types/comment.types";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

interface CommentListProps {
  ideaId: string;
}

export function CommentList({ ideaId }: CommentListProps) {
  const { isAuthenticated } = useAuth();
  const { data: comments, isLoading, error, refetch } = useComments(ideaId);
  const [isRefetching, setIsRefetching] = useState(false);

  // ✅ Build tree only if needed
  const buildCommentTree = useCallback((flatComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const roots: Comment[] = [];

    flatComments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    flatComments.forEach((comment) => {
      const current = commentMap.get(comment.id)!;

      if (comment.parentId && commentMap.has(comment.parentId)) {
        const parent = commentMap.get(comment.parentId)!;
        parent.replies?.push(current);
      } else {
        roots.push(current);
      }
    });

    return roots;
  }, []);

  // ✅ Decide structure (NO runtime confusion)
  const commentTree = useMemo(() => {
    if (!comments || comments.length === 0) return [];

    // If backend already sends nested
    if (comments[0]?.replies !== undefined) {
      return comments;
    }

    return buildCommentTree(comments);
  }, [comments, buildCommentTree]);

  const totalComments = comments?.length ?? 0;

  const handleRefresh = useCallback(async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  }, [refetch]);

  // ✅ Loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">Loading comments...</h3>
        </div>

        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load comments. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="font-semibold">
          {totalComments} {totalComments === 1 ? "Comment" : "Comments"}
        </h3>

        {isRefetching && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Form */}
      {isAuthenticated && (
        <CommentForm ideaId={ideaId} onSuccess={handleRefresh} />
      )}

      {/* Empty */}
      {totalComments === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              ideaId={ideaId}
              onReplySuccess={handleRefresh}
              onDeleteSuccess={handleRefresh}
              onEditSuccess={handleRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
