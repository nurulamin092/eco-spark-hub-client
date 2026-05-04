"use client";

import { useQuery } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";
import { MEMBER_QUERY_KEYS } from "../../constants/member.query-keys";

export function useMemberDetails(id: string) {
  return useQuery({
    queryKey: MEMBER_QUERY_KEYS.detail(id),
    queryFn: () => memberService.getMemberById(id),
    enabled: !!id,
  });
}
