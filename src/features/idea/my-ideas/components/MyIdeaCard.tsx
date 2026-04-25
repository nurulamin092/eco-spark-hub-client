"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Send,
  DollarSign,
} from "lucide-react";
import { Idea } from "../../shared/types/idea.types";
import { DeleteIdeaDialog } from "./DeleteIdeaDialog";
import { useSubmitIdea } from "../hooks/useSubmitIdea";
import { formatNumber } from "@/lib/utils/format";

interface MyIdeaCardProps {
  idea: Idea;
  onRefresh: () => void;
}

const statusConfig = {
  DRAFT: { label: "Draft", variant: "secondary" as const },
  UNDER_REVIEW: { label: "Under Review", variant: "default" as const },
  APPROVED: { label: "Approved", variant: "default" as const },
  REJECTED: { label: "Rejected", variant: "destructive" as const },
};

// function formatNumber(num: number | null | undefined): string {
//   if (num === null || num === undefined || typeof num !== "number") {
//     console.warn("Invalid number provided to formatNumber:", num);
//     return "0";
//   }

//   if (isNaN(num)) {
//     console.warn("NaN provided to formatNumber");
//     return "0";
//   }

//   if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
//   if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
//   return num.toString();
// }

export function MyIdeaCard({ idea, onRefresh }: MyIdeaCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutateAsync: submitIdea, isPending: isSubmitting } = useSubmitIdea();

  const status = useMemo(() => {
    return (
      statusConfig[idea.status as keyof typeof statusConfig] ??
      statusConfig.DRAFT
    );
  }, [idea.status]);

  const canEdit = idea.status === "DRAFT";
  const canSubmit = idea.status === "DRAFT";
  const canDelete = idea.status === "DRAFT";

  const handleSubmit = useCallback(async () => {
    await submitIdea(idea.id);
    onRefresh();
  }, [submitIdea, idea.id, onRefresh]);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              <Badge variant={status.variant}>{status.label}</Badge>

              {idea.isPaid && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />${idea.price}
                </Badge>
              )}
            </div>

            <div className="flex gap-1">
              {canEdit && (
                <Link href={`/member/ideas/${idea.id}/edit`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {canDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <Link href={`/ideas/${idea.id}`}>
            <CardTitle className="hover:text-primary transition-colors line-clamp-2">
              {idea.title}
            </CardTitle>
          </Link>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-2">
            {idea.description}
          </p>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span>{formatNumber(idea.upvoteCount)}</span>

              <ArrowDown className="h-4 w-4 text-red-500 ml-2" />
              <span>{formatNumber(idea.downvoteCount)}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{formatNumber(idea.commentCount)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(idea.viewCount)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-muted-foreground">
              Created {new Date(idea.createdAt).toLocaleDateString()}
            </span>

            {canSubmit && (
              <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                <Send className="h-3 w-3 mr-1" />
                Submit for Review
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <DeleteIdeaDialog
        ideaId={idea.id}
        ideaTitle={idea.title}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
