/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { RegisterFormValues } from "../schemas/register.schema";

export function useRegisterMutation() {
  const router = useRouter();
  const { register } = useAuth();

  return useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      await register(values.name, values.email, values.password);
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
