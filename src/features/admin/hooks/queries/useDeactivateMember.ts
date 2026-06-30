/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";
import { MEMBER_QUERY_KEYS } from "../../constants/member.query-keys";

import { toast } from "sonner";

export function useDeactivateMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memberService.deactivateMember(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MEMBER_QUERY_KEYS.all });
      toast.success("Member deactivated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Deactivation failed");
    },
  });
}
