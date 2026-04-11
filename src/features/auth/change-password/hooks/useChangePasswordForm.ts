/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "../schema/change-password.schema";
import { useChangePassword } from "./useChangePassword";

export function useChangePasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync, isPending } = useChangePassword();

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    } as ChangePasswordFormValues,
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
        const result = changePasswordSchema.safeParse(value);
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
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
  };
}
