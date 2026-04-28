// ============ src/features/comment/components/CommentItem.tsx ============
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Edit2, Trash2, Check, X, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Comment } from "../types/comment.types";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { useCreateComment } from "../hooks/useCreateComment";

interface CommentItemProps {
  comment: Comment;
  ideaId: string;
  depth?: number;
  onReplySuccess?: () => void;
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
}

const MAX_DEPTH = 5;

export function CommentItem({
  comment,
  ideaId,
  depth = 0,
  onReplySuccess,
  onDeleteSuccess,
  onEditSuccess,
}: CommentItemProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");

  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment(ideaId);
  const { mutateAsync: updateComment, isPending: isUpdating } =
    useUpdateComment(ideaId, comment.id);
  const { mutateAsync: createReply, isPending: isReplyingPending } =
    useCreateComment(ideaId);

  const isOwner = user?.id === comment.userId;
  const canReply = depth < MAX_DEPTH && !comment.isDeleted;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(comment.id);
      onDeleteSuccess?.();
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    await updateComment({ content: editContent });
    setIsEditing(false);
    onEditSuccess?.();
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await createReply({
      content: replyContent,
      ideaId,
      parentId: comment.id,
    });
    setReplyContent("");
    setIsReplying(false);
    onReplySuccess?.();
  };

  if (comment.isDeleted) {
    return (
      <div className="py-3 px-4 bg-muted/30 rounded-lg text-muted-foreground text-sm italic">
        [Deleted comment]
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Comment */}
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={comment.user?.image || ""} />
          <AvatarFallback>
            {comment.user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {comment.user?.name}
                </span>
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
                    <X className="h-3 w-3 mr-1" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUpdate}
                    disabled={isUpdating || !editContent.trim()}
                  >
                    <Check className="h-3 w-3 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap wrap-break-words">
                {comment.content}
              </p>
            )}
          </div>

          {/* Reply Button */}
          {canReply && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 h-7 px-2 text-xs"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Reply
            </Button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="ml-11 mt-2">
          <div className="flex gap-3">
            <Avatar className="h-7 w-7">
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={`Write a reply to ${comment.user?.name}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-20 text-sm"
                disabled={isReplyingPending}
              />
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleReply}
                  disabled={isReplyingPending || !replyContent.trim()}
                >
                  {isReplyingPending && (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  )}
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 space-y-3 mt-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              ideaId={ideaId}
              depth={depth + 1}
              onReplySuccess={onReplySuccess}
              onDeleteSuccess={onDeleteSuccess}
              onEditSuccess={onEditSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
