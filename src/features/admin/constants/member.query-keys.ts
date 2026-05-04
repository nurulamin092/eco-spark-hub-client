/* eslint-disable @typescript-eslint/no-explicit-any */
export const MEMBER_QUERY_KEYS = {
  all: ["admin", "members"] as const,
  lists: () => [...MEMBER_QUERY_KEYS.all, "list"] as const,
  list: (filters: any) => [...MEMBER_QUERY_KEYS.lists(), filters] as const,
  details: () => [...MEMBER_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...MEMBER_QUERY_KEYS.details(), id] as const,
};
