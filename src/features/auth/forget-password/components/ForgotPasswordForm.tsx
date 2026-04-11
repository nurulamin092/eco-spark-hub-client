"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { AppField } from "@/components/shared/form/AppField";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";

export function ForgotPasswordForm() {
  const router = useRouter();
  const {
    form,
    isPending,
    serverError,
    isSuccess,
    submittedEmail,
    submitForm,
  } = useForgotPasswordForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await submitForm();
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a password reset OTP to{" "}
            <span className="font-medium text-primary">{submittedEmail}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter the OTP on the next page to reset your password.
          </p>
          <Button
            onClick={() =>
              router.push(
                `/reset-password?email=${encodeURIComponent(submittedEmail)}`,
              )
            }
            className="w-full"
          >
            Continue to Reset Password
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
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

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you an OTP to reset your
          password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <form.Field name="email">
            {(field) => (
              <AppField
                name={field.name}
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={<Mail className="h-4 w-4 text-muted-foreground" />}
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
            text="Send Reset OTP"
            loadingText="Sending..."
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
