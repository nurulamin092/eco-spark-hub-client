/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  useMutation,
  useQueryClient,
  type RefetchOptions,
} from "@tanstack/react-query";
import { authApi, type User } from "@/lib/api/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  refetchUser: (options?: RefetchOptions) => Promise<unknown>; // Fixed: proper type
}

export function useAuth(): UseAuthReturn {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser, // Renamed internally for clarity
  } = useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authApi.getMe(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authApi.login(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast.success(response.message || "Login successful");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: { name: string; email: string; password: string }) =>
      authApi.register(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast.success(response.message || "Registration successful");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    },
    onError: () => {
      queryClient.clear();
      router.push("/");
      router.refresh();
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      authApi.changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to change password";
      toast.error(message);
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  const register = (name: string, email: string, password: string) => {
    registerMutation.mutate({ name, email, password });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };

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
    refetchUser,
  };
}
