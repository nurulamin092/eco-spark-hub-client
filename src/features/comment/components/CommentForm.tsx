"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useCreateComment } from "../hooks/useCreateComment";

interface CommentFormProps {
  ideaId: string;
  parentId?: string;
  parentAuthorName?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function CommentForm({
  ideaId,
  parentId,
  parentAuthorName,
  onCancel,
  onSuccess,
}: CommentFormProps) {
  const { user, isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync, isPending } = useCreateComment(ideaId);

  useEffect(() => {
    if (textareaRef.current && isFocused) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleSubmit = useCallback(async () => {
    if (!content.trim()) return;

    try {
      await mutateAsync({ content, ideaId, parentId });
      setContent("");
      onSuccess?.();
      onCancel?.();
    } catch {
      // Error handled by mutation
    }
  }, [content, ideaId, parentId, mutateAsync, onSuccess, onCancel]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Please{" "}
        <a href="/login" className="text-primary hover:underline">
          login
        </a>{" "}
        to leave a comment
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          {parentAuthorName && (
            <div className="text-sm text-muted-foreground mb-1">
              Replying to{" "}
              <span className="font-medium text-foreground">
                @{parentAuthorName}
              </span>
            </div>
          )}
          <Textarea
            ref={textareaRef}
            placeholder={
              parentAuthorName ? `Write your reply...` : "Write a comment..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="min-h-20 resize-y"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Posting...
            </>
          ) : parentAuthorName ? (
            "Reply"
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </div>
  );
}
