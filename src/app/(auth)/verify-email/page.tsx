import { VerifyEmailForm } from "@/features/auth/verify-email/components/VerifyEmailForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email | EcoSpark Hub",
  description: "Verify your email address to complete registration",
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-background py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
