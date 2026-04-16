"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useCreateComment } from "../hooks/useCreateComment";

interface BlogCommentFormProps {
  blogId: string;
  parentId?: string;
  onSuccess?: () => void;
}

export function BlogCommentForm({
  blogId,
  parentId,
  onSuccess,
}: BlogCommentFormProps) {
  const { user, isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const { mutateAsync, isPending } = useCreateComment();

  const handleSubmit = useCallback(async () => {
    if (!content.trim()) return;
    await mutateAsync({ content, blogId, parentId });
    setContent("");
    onSuccess?.();
  }, [content, blogId, parentId, mutateAsync, onSuccess]);

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
          <Textarea
            placeholder={parentId ? "Write a reply..." : "Write a comment..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-20 resize-y"
            disabled={isPending}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
          {parentId ? "Reply" : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}
