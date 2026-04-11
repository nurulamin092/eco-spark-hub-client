/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "../schemas/forgot-password.schema";
import { useForgotPassword } from "./useForgotPassword";

export interface ForgotPasswordSubmitResult {
  success: boolean;
  email?: string;
}

export function useForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const { mutateAsync, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: { email: "" } as ForgotPasswordFormValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await mutateAsync(value);
        setIsSuccess(true);
        setSubmittedEmail(value.email);
        return { success: true, email: value.email };
      } catch (error: any) {
        setServerError(error.message);
        return { success: false };
      }
    },
    validators: {
      onChange: ({ value }) => {
        const result = forgotPasswordSchema.safeParse(value);
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

  const submitForm = async () => {
    const result = await form.handleSubmit();
    return result;
  };

  return {
    form,
    isPending,
    serverError,
    isSuccess,
    submittedEmail,
    submitForm,
  };
}
