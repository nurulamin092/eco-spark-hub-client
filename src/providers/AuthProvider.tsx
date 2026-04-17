"use client";

import { createContext, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { queryKeys } from "@/lib/react-query/queryClient";
import { AuthContextType } from "@/features/auth/shared/types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      try {
        const res = await authApi.getMe();
        return res.data;
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const isAuthenticated = !isLoading && !!data?.user && !!data.user.id;

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login(email, password);

      if (!res?.data?.accessToken) {
        throw new Error("Login failed");
      }

      localStorage.setItem("accessToken", res.data.accessToken);

      if (res.data.refreshToken) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });
    },
    [queryClient],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await authApi.register(name, email, password);

      if (!res?.data?.accessToken) {
        throw new Error("Registration failed");
      }

      localStorage.setItem("accessToken", res.data.accessToken);

      if (res.data.refreshToken) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {}

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    queryClient.clear();
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user: data?.user ?? null,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout,
      refetch,
    }),
    [data, isLoading, isAuthenticated, login, register, logout, refetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
