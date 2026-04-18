"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, User } from "@/lib/services/auth.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // React Query দিয়ে ইউজার ডাটা ম্যানেজ করুন
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      try {
        const response = await authService.getMe();
        setIsAuthenticated(true);
        return response.data.user;
      } catch {
        setIsAuthenticated(false);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const login = useCallback(
    async (email: string, password: string) => {
      await authService.login({ email, password });
      await refetch();
      setIsAuthenticated(true);
    },
    [refetch],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await authService.register({ name, email, password });
      await refetch();
      setIsAuthenticated(true);
    },
    [refetch],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    queryClient.clear();
    setIsAuthenticated(false);
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user: data ?? null,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [data, isLoading, isAuthenticated, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
