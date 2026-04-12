"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { useBookmark } from "../hooks/useBookmark";
import { useIsBookmarked } from "../hooks/useIsBookmarked";
import { toast } from "sonner";

interface BookmarkButtonProps {
  ideaId: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const sizeClasses = {
  sm: { button: "h-7 px-2", icon: "h-3 w-3", text: "text-xs" },
  md: { button: "h-9 px-3", icon: "h-4 w-4", text: "text-sm" },
  lg: { button: "h-10 px-4", icon: "h-5 w-5", text: "text-base" },
};

export function BookmarkButton({
  ideaId,
  size = "md",
  showLabel = true,
}: BookmarkButtonProps) {
  const { isAuthenticated } = useAuth();
  const { data: isBookmarked, isLoading: isChecking } = useIsBookmarked(ideaId);
  const { mutateAsync, isPending } = useBookmark(ideaId);

  const handleClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to bookmark");
      return;
    }
    await mutateAsync();
  };

  const isLoading = isChecking || isPending;
  const bookmarked = isBookmarked || false;

  return (
    <Button
      variant="outline"
      size="sm"
      className={sizeClasses[size].button}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Bookmark
        className={`${sizeClasses[size].icon} mr-1 ${bookmarked ? "fill-primary text-primary" : ""}`}
      />
      {showLabel && (
        <span className={sizeClasses[size].text}>
          {isLoading ? "..." : bookmarked ? "Saved" : "Save"}
        </span>
      )}
    </Button>
  );
}
