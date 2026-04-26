// ============ src/app/(dashboard)/member/change-password/page.tsx ============
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";
import { ChangePasswordForm } from "@/features/auth/change-password/components/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password | Member Dashboard",
  description: "Change your account password",
};

export default async function ChangePasswordPage() {
  await requireAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <ChangePasswordForm />
    </div>
  );
}
