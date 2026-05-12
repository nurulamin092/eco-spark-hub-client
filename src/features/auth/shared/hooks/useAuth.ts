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

// Cookie helper functions

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
      if (serverUnhealthy) {
        console.warn("Auth skipped: Server marked as unhealthy");
        return null;
      }

      try {
        const result = await authApi.getMe();
        if (isMountedRef.current && serverUnhealthy) {
          setServerUnhealthy(false);
        }
        return result;
      } catch (err: any) {
        const status = err.status || err.response?.status;

        if (process.env.NODE_ENV === "development" && status !== 429) {
          console.warn(`getMe failed (${status})`);
        }

        if (isMountedRef.current && (status === 500 || status === 503)) {
          setServerUnhealthy(true);
        }

        if (
          status === 429 ||
          status === 500 ||
          status === 503 ||
          status === 401
        ) {
          return null;
        }

        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      const status = error?.status || error?.response?.status;
      if (
        status === 429 ||
        status === 500 ||
        status === 503 ||
        status === 401
      ) {
        return false;
      }
      return failureCount < 1;
    },
    retryDelay: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    initialData: () => {
      const cached = queryClient.getQueryData<User>(authKeys.user());
      return cached;
    },
    initialDataUpdatedAt: () => {
      const state = queryClient.getQueryState(authKeys.user());
      return state?.dataUpdatedAt;
    },
  });

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

  useEffect(() => {
    if (serverUnhealthy) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setServerUnhealthy(false);
          debouncedRefetch();
        }
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [serverUnhealthy, debouncedRefetch]);

  //  LOGIN MUTATION - Fixed
  const loginMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authApi.login(payload),
    onSuccess: (response) => {
      if (isMountedRef.current && serverUnhealthy) {
        setServerUnhealthy(false);
      }
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast.success(response.message || "Login successful");

      // Small delay to ensure cookies are set before navigation
      setTimeout(() => {
        const role = response.data.user?.role;
        if (role === "ADMIN" || role === "SUPER_ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }, 100);
    },
    onError: (error: any) => {
      const status = error.response?.status;
      let message = error.response?.data?.message || "Login failed";

      if (status === 429) {
        message = "Too many login attempts. Please try again later.";
      } else if (status === 500) {
        message = "Server error. Please try again later.";
      }

      toast.error(message);
    },
  });

  //  REGISTER MUTATION - Fixed
  const registerMutation = useMutation({
    mutationFn: (payload: { name: string; email: string; password: string }) =>
      authApi.register(payload),
    onSuccess: (response) => {
      if (isMountedRef.current && serverUnhealthy) {
        setServerUnhealthy(false);
      }
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast.success(response.message || "Registration successful");

      setTimeout(() => {
        const role = response.data.user?.role;
        if (role === "ADMIN" || role === "SUPER_ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }, 100);
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
      console.log(" [DEBUG] Starting logout process...");
      console.log(" [DEBUG] Current cookies BEFORE:", document.cookie);

      // Step 1: Clear React Query cache
      queryClient.clear();
      console.log(" [DEBUG] Query cache cleared");

      // Step 2: Call logout API
      try {
        console.log(" [DEBUG] Calling logout API...");
        const response = await authApi.logout();
        console.log(" [DEBUG] Logout API response:", response);
      } catch (apiError) {
        console.warn(" [DEBUG] Logout API error:", apiError);
      }

      // Step 3: Wait a bit for backend processing
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log(" [DEBUG] Waited 200ms for backend");

      // Step 4: Aggressive client-side cookie clearing
      console.log(" [DEBUG] Clearing client-side cookies...");

      const allCookies = [
        "accessToken",
        "refreshToken",
        "better-auth.session_token",
        "token",
        "userRole",
        "role",
      ];

      // Get all existing cookies
      const existingCookies = document.cookie
        .split(";")
        .map((c) => c.split("=")[0].trim());
      const cookiesToClear = [...new Set([...allCookies, ...existingCookies])];

      console.log(" [DEBUG] Cookies to clear:", cookiesToClear);

      // Clear each cookie with multiple strategies
      cookiesToClear.forEach((name) => {
        if (!name) return;

        // Strategy 1: Basic expiration
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        // Strategy 2: max-age=0
        document.cookie = `${name}=; max-age=0; path=/;`;

        // Strategy 3: SameSite=Lax
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;

        // Strategy 4: Domain variation for localhost
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;

        // Strategy 5: Different paths
        ["/api", "/admin", "/dashboard"].forEach((path) => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
        });
      });

      console.log(" [DEBUG] Cookies AFTER clearing:", document.cookie);

      // Step 5: Clear all storage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.clear();
        console.log(" [DEBUG] Session storage cleared");
      }
      if (typeof localStorage !== "undefined") {
        localStorage.clear();
        console.log(" [DEBUG] Local storage cleared");
      }

      console.log(" [DEBUG] Logout cleanup completed");
    },
    onSuccess: () => {
      console.log(" [DEBUG] Logout successful, redirecting...");
      toast.success("Logged out successfully");
      window.location.replace("/login?t=" + Date.now());
    },
    onError: (error: any) => {
      console.error(" [DEBUG] Logout error:", error);
      window.location.replace("/login?t=" + Date.now());
    },
  });
  //  CHANGE PASSWORD MUTATION
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

  //  CALLBACKS - All properly memoized
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
