// ============ src/app/(public)/payment/success/PaymentSuccessContent.tsx ============
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePayment } from "@/features/payment/hooks/usePayment";

export function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { refetch } = usePayment();

  useEffect(() => {
    if (!sessionId) {
      router.push("/dashboard");
      return;
    }

    const verifyPayment = async () => {
      try {
        await refetch();
        setIsSuccess(true);
      } catch (error) {
        console.error("Payment verification failed:", error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, router, refetch]);

  if (isVerifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-yellow-600 dark:text-yellow-400 animate-spin" />
              </div>
            </div>
            <CardTitle className="text-2xl">Verification in Progress</CardTitle>
            <CardDescription>
              Your payment is being processed. This may take a few moments.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3">
            <Button onClick={() => refetch()} className="w-full">
              Refresh Status
            </Button>
            <Link href="/dashboard">
              <Button variant="link" className="text-muted-foreground">
                Go to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful! 🎉</CardTitle>
          <CardDescription>
            Thank you for your purchase. You now have full access to this idea.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              You can now access the complete content. Check your email for the
              receipt.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/ideas">
            <Button variant="link" className="text-muted-foreground">
              Continue Browsing Ideas
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
