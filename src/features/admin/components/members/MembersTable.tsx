"use client";

import { useMembers } from "../../hooks/queries/useMembers";
import { MembersRow } from "./MembersRow";
import { Skeleton } from "@/components/ui/skeleton";

export function MembersTable() {
  const { data, isLoading } = useMembers({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <div className="space-y-4">
      {data?.data.map((member) => (
        <MembersRow key={member.id} member={member} />
      ))}
    </div>
  );
}
