// ============ src/features/comment/components/CommentList.tsx ============
"use client";

import { CommentThread } from "./CommentThread";
import { CommentForm } from "./CommentForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, MessageCircle } from "lucide-react";
import { useComments } from "../hooks/useComments";
import { Comment, CommentsResponse } from "../types/comment.types";
import { ReactElement } from "react";

interface CommentListProps {
  ideaId: string;
}

export function CommentList({ ideaId }: CommentListProps): ReactElement {
  const { data, isLoading, error } = useComments(ideaId);

  // ✅ Safe data extraction with proper typing
  let comments: Comment[] = [];

  if (data) {
    // Case 1: data is directly an array
    if (Array.isArray(data)) {
      comments = data;
    }
    // Case 2: data has data property that is array (ApiResponse format)
    else if (
      typeof data === "object" &&
      "data" in data &&
      Array.isArray((data as CommentsResponse).data)
    ) {
      comments = (data as CommentsResponse).data;
    }
    // Case 3: data has comments property that is array
    else if (
      typeof data === "object" &&
      "comments" in data &&
      Array.isArray((data as { comments: Comment[] }).comments)
    ) {
      comments = (data as { comments: Comment[] }).comments;
    }
  }

  // ✅ Ensure comments is always an array
  const safeComments = Array.isArray(comments) ? comments : [];

  const topLevelComments = safeComments.filter((c: Comment) => !c.parentId);
  const totalComments = safeComments.length;

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
        </div>
      </div>

      <CommentForm ideaId={ideaId} />

      {topLevelComments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topLevelComments.map((comment: Comment) => (
            <CommentThread key={comment.id} comment={comment} ideaId={ideaId} />
          ))}
        </div>
      )}
    </div>
  );
}
