/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/hooks/queries/useMemberStats.ts
import { useQuery } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";

export const useMemberStats = () => {
  return useQuery({
    queryKey: ["admin", "members", "stats"],
    queryFn: async () => {
      const members = await memberService.getAllMembers({
        page: 1,
        limit: 1000,
      });
      const data = members.data;

      return {
        total: data.length,
        active: data.filter((m: any) => m.user?.status === "ACTIVE").length,
        inactive: data.filter((m: any) => m.user?.status === "INACTIVE").length,
        blocked: data.filter((m: any) => m.user?.status === "BLOCKED").length,
        newThisMonth: data.filter((m: any) => {
          const createdAt = new Date(m.createdAt);
          const now = new Date();
          return (
            createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear()
          );
        }).length,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
