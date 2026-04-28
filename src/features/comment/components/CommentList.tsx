// ============ src/features/comment/components/CommentList.tsx ============
"use client";

import { useState, useCallback } from "react";
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

  // Build comment tree from flat list
  const buildCommentTree = useCallback((flatComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const roots: Comment[] = [];

    // First, create a map of all comments
    flatComments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Then, build the tree structure
    flatComments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parentId && commentMap.has(comment.parentId)) {
        const parent = commentMap.get(comment.parentId)!;
        if (!parent.replies) parent.replies = [];
        parent.replies.push(commentWithReplies);
      } else {
        roots.push(commentWithReplies);
      }
    });

    // Sort roots by createdAt (oldest first)
    roots.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Sort replies within each comment
    const sortReplies = (commentArray: Comment[]) => {
      commentArray.forEach((comment) => {
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          sortReplies(comment.replies);
        }
      });
    };
    sortReplies(roots);

    return roots;
  }, []);

  const getComments = useCallback((responseData: unknown): Comment[] => {
    if (!responseData) return [];
    if (Array.isArray(responseData)) return responseData;
    if (typeof responseData === "object" && responseData !== null) {
      const obj = responseData as Record<string, unknown>;
      if (Array.isArray(obj.data)) return obj.data as Comment[];
      if (Array.isArray(obj.comments)) return obj.comments as Comment[];
    }
    return [];
  }, []);

  const flatComments = getComments(comments);
  const commentTree = buildCommentTree(flatComments);
  const totalComments = flatComments.length;

  // ✅ Refresh function with loading state
  const handleRefresh = useCallback(async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  }, [refetch]);

  // ✅ Handle comment post success
  const handleCommentSuccess = useCallback(() => {
    handleRefresh();
  }, [handleRefresh]);

  // ✅ Handle reply success
  const handleReplySuccess = useCallback(() => {
    handleRefresh();
  }, [handleRefresh]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">Loading comments...</h3>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">
            {totalComments} {totalComments === 1 ? "Comment" : "Comments"}
          </h3>
          {isRefetching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
      </div>

      {isAuthenticated && (
        <CommentForm ideaId={ideaId} onSuccess={handleCommentSuccess} />
      )}

      {commentTree.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              ideaId={ideaId}
              onReplySuccess={handleReplySuccess}
              onDeleteSuccess={handleRefresh}
              onEditSuccess={handleRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}