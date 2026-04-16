/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { BlogCommentForm } from "./BlogCommentForm";
import { useBlogComments } from "../hooks/useBlogComments";

interface BlogCommentProps {
  blogId: string;
}

export function BlogComment({ blogId }: BlogCommentProps) {
  const { data: comments, isLoading } = useBlogComments(blogId);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  if (isLoading)
    return <div className="text-center py-4">Loading comments...</div>;

  if (!comments?.length) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={() => setReplyTo(comment.id)}
        />
      ))}
      {replyTo && (
        <BlogCommentForm
          blogId={blogId}
          parentId={replyTo}
          onSuccess={() => setReplyTo(null)}
        />
      )}
    </div>
  );
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: any;
  onReply: () => void;
}) {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.user.image || ""} />
          <AvatarFallback>{comment.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs mt-1"
            onClick={onReply}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Reply
          </Button>
        </div>
      </div>
      {comment.replies?.length > 0 && (
        <div className="ml-11 space-y-3">
          {comment.replies.map((reply: any) => (
            <div key={reply.id} className="flex gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={reply.user.image || ""} />
                <AvatarFallback>{reply.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {reply.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(reply.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
