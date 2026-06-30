"use client";

import { useQuery } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";
import { MEMBER_QUERY_KEYS } from "../../constants/member.query-keys";

export function useMembers(filters: {
  page: number;
  limit: number;
  search?: string;
}) {
  return useQuery({
    queryKey: MEMBER_QUERY_KEYS.list(filters),
    queryFn: () => memberService.getAllMembers(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
  });
}
