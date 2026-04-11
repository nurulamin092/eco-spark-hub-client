/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "./useAuth";
import { LoginFormValues } from "../schemas/auth.schema";

export function useLoginMutation() {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      await login(values.email, values.password);
    },
    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}
