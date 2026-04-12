"use client";

import { CommentThread } from "./CommentThread";
import { CommentForm } from "./CommentForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, MessageCircle } from "lucide-react";
import { useComments } from "../hooks/useComments";

interface CommentListProps {
  ideaId: string;
}

export function CommentList({ ideaId }: CommentListProps) {
  const { data: comments, isLoading, error } = useComments(ideaId);

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

  const topLevelComments = comments?.filter((c) => !c.parentId) || [];
  const totalComments = comments?.length || 0;

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
          {topLevelComments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} ideaId={ideaId} />
          ))}
        </div>
      )}
    </div>
  );
}
