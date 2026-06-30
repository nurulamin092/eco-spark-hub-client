"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const IdeaList = dynamic(
  () => import("./IdeaList").then((mod) => mod.IdeaList),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    ),
  },
);

export function IdeaListWrapper() {
  return <IdeaList />;
}
