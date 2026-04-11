import { ResetPasswordForm } from "@/features/auth/forget-password";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password | EcoSpark Hub",
  description: "Create a new password for your EcoSpark Hub account",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
