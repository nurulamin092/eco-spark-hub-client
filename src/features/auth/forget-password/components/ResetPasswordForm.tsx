"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Eye, EyeOff, ArrowLeft, Mail } from "lucide-react";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import { AppField } from "@/components/shared/form/AppField";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const {
    form,
    isPending,
    serverError,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
  } = useResetPasswordForm(email, otp);

  if (!email) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Invalid Request</CardTitle>
          <CardDescription>
            Please request a password reset from the forgot password page.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Go to Forgot Password
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Create a new password for your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Email (readonly) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 rounded-lg border bg-muted text-muted-foreground"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* OTP */}
          <form.Field name="otp">
            {(field) => (
              <AppField
                name={field.name}
                label="OTP Code"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
              />
            )}
          </form.Field>

          {/* New Password */}
          <form.Field name="newPassword">
            {(field) => (
              <AppField
                name={field.name}
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground"
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

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => (
              <AppField
                name={field.name}
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <AppSubmitButton
            isPending={isPending}
            text="Reset Password"
            loadingText="Resetting..."
          />
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <Link
          href="/login"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
}
