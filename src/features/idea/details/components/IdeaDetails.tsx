"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

interface IdeaDetailsProps {
  ideaId: string;
}

export function IdeaDetails({ ideaId }: IdeaDetailsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: idea, isLoading, error } = useIdeaDetails(ideaId);

  const handleVote = useCallback(async (type: "UP" | "DOWN") => {
    // Implement vote logic here
    toast.success(`Voted ${type}`);
  }, []);

  const handleBookmark = useCallback(async () => {
    // Implement bookmark logic here
    toast.success("Bookmarked");
  }, []);

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

  const handlePurchase = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // Implement payment logic here
    toast.info("Payment integration coming soon");
  }, [isAuthenticated, router]);

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
        {isLocked && <PaywallOverlay idea={idea} onPurchase={handlePurchase} />}
      </div>

      <div className="border-t pt-6">
        <IdeaActions
          idea={idea}
          onVote={handleVote}
          onBookmark={handleBookmark}
          onShare={handleShare}
          userVote={null}
          isBookmarked={false}
        />
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
    </div>
  );
}
