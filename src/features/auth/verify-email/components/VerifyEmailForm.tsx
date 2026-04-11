"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, Mail, ArrowLeft } from "lucide-react";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { ResendOtpButton } from "./ResendOtpButton";

export const VerifyEmailForm = memo(function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending, isSuccess } = useVerifyEmail();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOtpChange = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, "");
    const truncated = digitsOnly.slice(0, 6);
    setOtp(truncated);

    if (truncated.length === 6) {
      setOtpError(null);
    } else if (truncated.length > 0 && truncated.length < 6) {
      setOtpError("OTP must be 6 digits");
    } else {
      setOtpError(null);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (otp.length !== 6) {
        setOtpError("Please enter a valid 6-digit OTP");
        return;
      }

      if (!email) {
        setOtpError("Email is missing. Please go back and try again.");
        return;
      }

      setOtpError(null);

      try {
        await mutateAsync({ email, otp });
      } catch {
        // Error handled by mutation
      }
    },
    [otp, email, mutateAsync],
  );

  if (!email) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Invalid Request</CardTitle>
          <CardDescription>
            Email address is missing. Please register again.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/register" className="text-primary hover:underline">
            Go to Register
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Verified!</CardTitle>
          <CardDescription>
            Your email has been successfully verified.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            You will be redirected to your dashboard shortly.
          </p>
          <Link href="/dashboard">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Mail className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-medium text-primary">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              ref={inputRef}
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              disabled={isPending}
              className="text-center text-2xl tracking-widest"
              maxLength={6}
              aria-invalid={!!otpError}
            />
            {otpError && <p className="text-sm text-destructive">{otpError}</p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || otp.length !== 6}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-muted-foreground">
            Didn&apos;t receive the code?
          </span>
          <ResendOtpButton email={email} initialCooldown={60} />
        </div>

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
});
