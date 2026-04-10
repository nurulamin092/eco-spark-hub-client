"use client";

import { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { queryKeys } from "@/lib/react-query/queryClient";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      try {
        const response = await authApi.getMe();
        setIsAuthenticated(true);
        return response.data;
      } catch {
        setIsAuthenticated(false);
        return null;
      }
    },
    retry: false,
    staleTime: Infinity,
  });

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    setIsAuthenticated(true);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.register(name, email, password);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authApi.logout();
    queryClient.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
