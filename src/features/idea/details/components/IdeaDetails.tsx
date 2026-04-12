"use client";

import { useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useIdeaDetails } from "../hooks/useIdeaDetails";
import { IdeaHeader } from "./IdeaHeader";
import { IdeaStats } from "./IdeaStats";
import { IdeaContent } from "./IdeaContent";
import { IdeaActions } from "./IdeaActions";
import { PaywallOverlay } from "./PaywallOverlay";
import { CommentList } from "@/features/comment/components/CommentList";

interface IdeaDetailsProps {
  ideaId: string;
}

export function IdeaDetails({ ideaId }: IdeaDetailsProps) {
  const { data: idea, isLoading, error } = useIdeaDetails(ideaId);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: idea?.title,
        text: idea?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  }, [idea]);

  if (isLoading) {
    return <IdeaDetailsSkeleton />;
  }

  if (error || !idea) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load idea. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const isLocked = idea.isPaid && idea.isLocked;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <IdeaHeader idea={idea} />
      <IdeaStats idea={idea} />

      <div className="relative">
        <IdeaContent idea={idea} isLocked={isLocked} />
        {isLocked && <PaywallOverlay idea={idea} />}
      </div>

      <div className="border-t pt-6">
        <IdeaActions idea={idea} onShare={handleShare} />
      </div>

      {/* Comments Section */}
      <div className="border-t pt-6 mt-6">
        <CommentList ideaId={idea.id} />
      </div>
    </div>
  );
}

function IdeaDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="space-y-4 pt-6">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
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
    </div>
  );
}
