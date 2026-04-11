import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | EcoSpark Hub",
  description: "Sign in to your EcoSpark Hub account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-background py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
