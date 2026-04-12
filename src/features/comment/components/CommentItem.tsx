"use client";

import { useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Edit2, Trash2, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "../types/comment.types";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { CommentForm } from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  ideaId: string;
  onReply?: () => void;
  isReplying?: boolean;
  onCancelReply?: () => void;
  depth?: number;
}

export function CommentItem({
  comment,
  ideaId,
  onReply,
  isReplying,
  onCancelReply,
  depth = 0,
}: CommentItemProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment(ideaId);
  const { mutateAsync: updateComment, isPending: isUpdating } =
    useUpdateComment(ideaId, comment.id);

  const isOwner = user?.id === comment.userId;
  const maxDepth = 5;
  const canReply = depth < maxDepth && !comment.isDeleted;

  const handleDelete = useCallback(async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(comment.id);
    }
  }, [comment.id, deleteComment]);

  const handleUpdate = useCallback(async () => {
    if (!editContent.trim()) return;
    await updateComment({ content: editContent });
    setIsEditing(false);
  }, [editContent, updateComment]);

  if (comment.isDeleted) {
    return (
      <div className="py-3 px-4 bg-muted/30 rounded-lg text-muted-foreground text-sm italic">
        [Deleted comment]
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={comment.user.image || ""} />
          <AvatarFallback>{comment.user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                {comment.isEdited && (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                )}
              </div>

              {isOwner && !isEditing && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2 mt-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-20"
                  disabled={isUpdating}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    disabled={isUpdating}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUpdate}
                    disabled={isUpdating || !editContent.trim()}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap wrap-break-words">
                {comment.content}
              </p>
            )}
          </div>

          {canReply && onReply && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 h-7 px-2 text-xs"
              onClick={onReply}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Reply
            </Button>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="ml-11 mt-2">
          <CommentForm
            ideaId={ideaId}
            parentId={comment.id}
            parentAuthorName={comment.user.name}
            onCancel={onCancelReply}
            onSuccess={onCancelReply}
          />
        </div>
      )}
    </div>
  );
}
