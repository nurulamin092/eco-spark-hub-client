"use client";

import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/user.service";
import { USER_QUERY_KEYS } from "../../constants/user.query-keys";
import { UsersQueryParams } from "../../types/users.types";

export function useUsers(filters: UsersQueryParams = {}) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.list(filters as Record<string, unknown>),
    queryFn: () => userService.getAllUsers(filters),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
