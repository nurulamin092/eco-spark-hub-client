// ============ src/features/admin/components/ideas/AdminIdeaDetails.tsx ============
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ideaService } from "@/features/idea/shared/services/idea.service";
import { AdminIdeaHeader } from "./AdminIdeaHeader";
import { AdminIdeaStats } from "./AdminIdeaStats";
import { AdminIdeaContent } from "./AdminIdeaContent";
import { AdminIdeaActions } from "./AdminIdeaActions";

interface AdminIdeaDetailsProps {
  ideaId: string;
}

export function AdminIdeaDetails({ ideaId }: AdminIdeaDetailsProps) {
  const router = useRouter();
  const {
    data: idea,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "idea", ideaId],
    queryFn: () => ideaService.getIdeaById(ideaId),
    enabled: !!ideaId,
    staleTime: 30 * 1000,
  });

  if (isLoading) {
    return <AdminIdeaDetailsSkeleton />;
  }

  if (error || !idea?.data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load idea details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const ideaData = idea.data;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Ideas
      </Button>

      {/* Main Content */}
      <AdminIdeaHeader idea={ideaData} />
      <AdminIdeaStats idea={ideaData} />
      <AdminIdeaContent idea={ideaData} />
      <AdminIdeaActions idea={ideaData} onSuccess={refetch} />
    </div>
  );
}

function AdminIdeaDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-24" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
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
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
