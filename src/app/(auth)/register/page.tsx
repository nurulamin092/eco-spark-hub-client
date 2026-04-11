import { RegisterForm } from "@/features/auth/register/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | EcoSpark Hub",
  description: "Create your EcoSpark Hub account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
