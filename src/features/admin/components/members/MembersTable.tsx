"use client";

import { useState } from "react";
import { useMembers } from "../../hooks/queries/useMembers";
import { MembersRow } from "./MembersRow";
import { Skeleton } from "@/components/ui/skeleton";

export function MembersTable() {
  const { data, isLoading, refetch } = useMembers({
    page: 1,
    limit: 10,
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <div className="space-y-4">
      {data?.data.map((member) => (
        <MembersRow
          key={member.id}
          member={member}
          isSelected={selectedIds.includes(member.id)}
          onSelect={(id) => {
            setSelectedIds((prev) =>
              prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
            );
          }}
          onUpdate={() => refetch()}
        />
      ))}
    </div>
  );
}
