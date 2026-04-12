"use client";

import { useState, useCallback } from "react";
import { Comment } from "../types/comment.types";
import { CommentItem } from "./CommentItem";

interface CommentThreadProps {
  comment: Comment;
  ideaId: string;
  depth?: number;
}

export function CommentThread({
  comment,
  ideaId,
  depth = 0,
}: CommentThreadProps) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = useCallback(() => {
    setIsReplying(true);
  }, []);

  const handleCancelReply = useCallback(() => {
    setIsReplying(false);
  }, []);

  return (
    <div className={depth > 0 ? "ml-8 mt-3" : "mt-4"}>
      <CommentItem
        comment={comment}
        ideaId={ideaId}
        onReply={handleReply}
        isReplying={isReplying}
        onCancelReply={handleCancelReply}
        depth={depth}
      />

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 mt-3">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              ideaId={ideaId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
