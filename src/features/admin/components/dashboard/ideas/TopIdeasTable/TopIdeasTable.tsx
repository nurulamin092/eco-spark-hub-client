"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { TopIdeasItem } from "./TopIdeasItem";
import { TopIdea } from "@/features/admin/types/admin.types";
interface TopIdeasTableProps {
  ideas: TopIdea[];
  isLoading?: boolean;
}

export function TopIdeasTable({ ideas, isLoading }: TopIdeasTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Top Ideas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ideas.map((idea, index) => (
          <TopIdeasItem key={idea.id} idea={idea} rank={index + 1} />
        ))}
      </CardContent>
    </Card>
  );
}
