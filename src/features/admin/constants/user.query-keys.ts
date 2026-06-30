export const USER_QUERY_KEYS = {
  all: ["admin", "users"] as const,
  lists: () => [...USER_QUERY_KEYS.all, "list"] as const,

  list: <T extends Record<string, unknown>>(filters: T) =>
    [...USER_QUERY_KEYS.lists(), filters] as const,
  details: () => [...USER_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...USER_QUERY_KEYS.details(), id] as const,
};
