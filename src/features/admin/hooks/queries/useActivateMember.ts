"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";
import { MEMBER_QUERY_KEYS } from "../../constants/member.query-keys";
import { toast } from "sonner";

export function useActivateMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: memberService.activate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MEMBER_QUERY_KEYS.all });
      toast.success("Member activated");
    },
  });
}
