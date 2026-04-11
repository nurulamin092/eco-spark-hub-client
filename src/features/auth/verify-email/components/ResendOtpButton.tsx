"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useResendOtp } from "../hooks/useResendOtp";

interface ResendOtpButtonProps {
  email: string;
  initialCooldown?: number;
}

function ResendOtpButtonComponent({
  email,
  initialCooldown = 60,
}: ResendOtpButtonProps) {
  const [cooldown, setCooldown] = useState(initialCooldown);
  const { mutateAsync, isPending } = useResendOtp();

  const canResend = cooldown <= 0;

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (!canResend || isPending) return;

    try {
      await mutateAsync({ email });
      setCooldown(initialCooldown);
    } catch {
      // handled globally
    }
  }, [canResend, isPending, mutateAsync, email, initialCooldown]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleResend}
      disabled={!canResend || isPending}
      className="text-sm"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          Sending...
        </>
      ) : canResend ? (
        "Resend OTP"
      ) : (
        `Resend OTP in ${cooldown}s`
      )}
    </Button>
  );
}

export const ResendOtpButton = memo(function Wrapper(
  props: ResendOtpButtonProps,
) {
  return <ResendOtpButtonComponent key={props.email} {...props} />;
});
