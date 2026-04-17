"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useProfile() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: async () => {
      return user;
    },
    enabled: !!user,
    initialData: user || undefined,
  });

  return {
    profile: data,
    isLoading: isLoading || isAuthLoading,
    refetch,
  };
}
