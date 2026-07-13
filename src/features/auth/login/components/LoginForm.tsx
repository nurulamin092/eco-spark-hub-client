/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Eye, EyeOff, ShieldCheck, User } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { useLoginForm } from "../hooks/useLoginForm";

import { AppField } from "@/components/shared/form/AppField";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";

import { SocialLoginButtons } from "@/features/auth/shared/components/SocialLoginButtons";
import { AuthRedirectFooter } from "../../shared/components/AuthRedirectFooter";

export function LoginForm() {
  const [role, setRole] = useState<"member" | "admin">("member");

  // Later you can do:

  const { form, isPending, serverError, showPassword, setShowPassword } =
    useLoginForm();

  const DEMO_MEMBER = {
    email: "muaz@gmail.com",
    password: "password",
  };
  const DEMO_ADMIN = {
    email: "admin@eco.com",
    password: "password",
  };
  useEffect(() => {
    if (role === "member") {
      form.setFieldValue("email", DEMO_MEMBER.email);
      form.setFieldValue("password", DEMO_MEMBER.password);
    } else {
      form.setFieldValue("email", DEMO_ADMIN.email);
      form.setFieldValue("password", DEMO_ADMIN.password);
    }
  }, [role]);

  const changeRole = (newRole: "member" | "admin") => {
    setRole(newRole);

    if (newRole === "member") {
      form.setFieldValue("email", DEMO_MEMBER.email);
      form.setFieldValue("password", DEMO_MEMBER.password);
    } else {
      form.setFieldValue("email", DEMO_ADMIN.email);
      form.setFieldValue("password", DEMO_ADMIN.password);
    }
  };
  return (
    <Card className="mx-auto w-full max-w-md rounded-3xl border-gradient glass shadow-card">
      <CardHeader className="space-y-6">
        {/* Role Switch */}
        <div className="grid grid-cols-2 rounded-2xl bg-muted p-1">
          <button
            type="button"
            onClick={() => changeRole("member")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all",
              role === "member"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <User className="h-4 w-4" />
            Member
          </button>

          <button
            type="button"
            onClick={() => changeRole("admin")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all",
              role === "admin"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {role === "member" ? (
              <User className="h-8 w-8" />
            ) : (
              <ShieldCheck className="h-8 w-8" />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">
            {role === "member" ? "Member Login" : "Admin Login"}
          </CardTitle>

          <CardDescription>
            {role === "member"
              ? "Sign in to access your EcoSpark account."
              : "Sign in with your administrator credentials."}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field name="email">
            {(field) => (
              <AppField
                name={field.name}
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <AppField
                name={field.name}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {role === "member" && (
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                text={
                  role === "member" ? "Continue as Member" : "Continue as Admin"
                }
                loadingText="Signing in..."
              />
            )}
          </form.Subscribe>
        </form>

        {role === "member" && <SocialLoginButtons isLoading={isPending} />}
      </CardContent>

      <AuthRedirectFooter
        text="Don't have an account?"
        linkText="Sign Up"
        href="/register"
      />
    </Card>
  );
}
