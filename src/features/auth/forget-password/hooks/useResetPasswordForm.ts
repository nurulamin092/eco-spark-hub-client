/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "../schemas/forgot-password.schema";
import { useResetPassword } from "./useResetPassword";

export function useResetPasswordForm(email: string, otp: string) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync, isPending } = useResetPassword();

  const form = useForm({
    defaultValues: {
      email,
      otp,
      newPassword: "",
      confirmPassword: "",
    } as ResetPasswordFormValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await mutateAsync(value);
      } catch (error: any) {
        setServerError(error.message);
      }
    },
    validators: {
      onChange: ({ value }) => {
        const result = resetPasswordSchema.safeParse(value);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.issues.forEach((issue) => {
            const path = issue.path[0];
            if (path && typeof path === "string") {
              errors[path] = issue.message;
            }
          });
          return errors;
        }
        return undefined;
      },
    },
  });

  return {
    form,
    isPending,
    serverError,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
  };
}
