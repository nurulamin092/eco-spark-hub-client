import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";
import { MEMBER_QUERY_KEYS } from "../../constants/member.query-keys";
import { toast } from "sonner";

export function useDeleteMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: memberService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MEMBER_QUERY_KEYS.all });
      toast.success("Member deleted");
    },
  });
}
