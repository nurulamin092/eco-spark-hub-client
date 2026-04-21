// ============ src/features/auth/shared/hooks/useAuth.ts ============
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  useMutation,
  useQueryClient,
  type RefetchOptions,
} from "@tanstack/react-query";
import { authApi, type User } from "@/lib/api/auth.api";
import { toast } from "sonner";
import { useCallback, useRef, useEffect, useState } from "react";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  isChangingPassword: boolean;
  refetchUser: (options?: RefetchOptions) => Promise<unknown>;
}

export function useAuth(): UseAuthReturn {
  const queryClient = useQueryClient();
  const refetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [serverUnhealthy, setServerUnhealthy] = useState(false);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }
    };
  }, []);

  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
  } = useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      // Skip if server is known to be unhealthy
      if (serverUnhealthy) {
        console.warn("Auth skipped: Server marked as unhealthy");
        return null;
      }

      try {
        const result = await authApi.getMe();
        // Reset unhealthy flag on successful response
        if (isMountedRef.current && serverUnhealthy) {
          setServerUnhealthy(false);
        }
        return result;
      } catch (err: any) {
        const status = err.status || err.response?.status;
        const message = err.message || err.response?.data?.message;

        // Log only in development for debugging
        if (process.env.NODE_ENV === "development" && status !== 429) {
          console.warn(`getMe failed (${status}):`, message);
        }

        // Mark server as unhealthy on 500/503
        if (isMountedRef.current && (status === 500 || status === 503)) {
          setServerUnhealthy(true);
        }

        // Don't throw for these status codes - just return null
        if (
          status === 429 ||
          status === 500 ||
          status === 503 ||
          status === 401
        ) {
          return null;
        }

        // For other errors, rethrow
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      const status = error?.status || error?.response?.status;

      // NEVER retry on these status codes
      if (
        status === 429 ||
        status === 500 ||
        status === 503 ||
        status === 401
      ) {
        return false;
      }

      // Max 1 retry for other errors
      return failureCount < 1;
    },
    retryDelay: 5000, // Wait 5 seconds before retry
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    // Use cached data if available
    initialData: () => {
      const cached = queryClient.getQueryData<User>(authKeys.user());
      return cached;
    },
    // Don't refetch on mount if we have valid cached data
    initialDataUpdatedAt: () => {
      const state = queryClient.getQueryState(authKeys.user());
      return state?.dataUpdatedAt;
    },
  });

  // Debounced refetch to prevent rapid successive calls (DECLARED FIRST)
  const debouncedRefetch = useCallback(
    (options?: RefetchOptions) => {
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }

      return new Promise((resolve, reject) => {
        refetchTimeoutRef.current = setTimeout(() => {
          refetchUser(options).then(resolve).catch(reject);
          refetchTimeoutRef.current = null;
        }, 500);
      });
    },
    [refetchUser],
  );

  // Reset unhealthy status after 30 seconds (USES debouncedRefetch AFTER declaration)
  useEffect(() => {
    if (serverUnhealthy) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setServerUnhealthy(false);
          // Trigger a refetch after server might be healthy
          debouncedRefetch();
        }
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [serverUnhealthy, debouncedRefetch]); // ✅ Added debouncedRefetch to dependencies

  const loginMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authApi.login(payload),
    onSuccess: (response) => {
      // Reset unhealthy flag on successful login
      if (isMountedRef.current && serverUnhealthy) {
        setServerUnhealthy(false);
      }
      // Update cache with user data
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast.success(response.message || "Login successful");
      // Use window.location for hard navigation to ensure cookie sync
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      const status = error.response?.status;
      let message = error.response?.data?.message || "Login failed";

      // Custom message for rate limit
      if (status === 429) {
        message = "Too many login attempts. Please try again later.";
      } else if (status === 500) {
        message = "Server error. Please try again later.";
      }

      toast.error(message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: { name: string; email: string; password: string }) =>
      authApi.register(payload),
    onSuccess: (response) => {
      // Reset unhealthy flag on successful registration
      if (isMountedRef.current && serverUnhealthy) {
        setServerUnhealthy(false);
      }
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast.success(response.message || "Registration successful");
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      const status = error.response?.status;
      let message = error.response?.data?.message || "Registration failed";

      if (status === 429) {
        message = "Too many registration attempts. Please try again later.";
      } else if (status === 500) {
        message = "Server error. Please try again later.";
      }

      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSuccess: () => {
      // Clear all query cache
      queryClient.clear();
      toast.success("Logged out successfully");
      window.location.href = "/";
    },
    onError: () => {
      // Still clear local state even if API fails
      queryClient.clear();
      window.location.href = "/";
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      authApi.changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      const status = error.response?.status;
      let message =
        error.response?.data?.message || "Failed to change password";

      if (status === 429) {
        message = "Too many attempts. Please try again later.";
      }

      toast.error(message);
    },
  });

  const login = useCallback(
    (email: string, password: string) => {
      loginMutation.mutate({ email, password });
    },
    [loginMutation],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      registerMutation.mutate({ name, email, password });
    },
    [registerMutation],
  );

  const logout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const changePassword = useCallback(
    (currentPassword: string, newPassword: string) => {
      changePasswordMutation.mutate({ currentPassword, newPassword });
    },
    [changePasswordMutation],
  );

  return {
    user: user ?? null,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    changePassword,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    refetchUser: debouncedRefetch,
  };
}
