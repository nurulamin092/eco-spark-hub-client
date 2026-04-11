import { ForgotPasswordForm } from "@/features/auth/forget-password/components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | EcoSpark Hub",
  description: "Reset your EcoSpark Hub account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
