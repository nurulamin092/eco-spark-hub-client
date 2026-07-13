import { Metadata } from "next";

import { requireAuth } from "@/lib/api/auth.guard";

import { ChangePasswordLayout } from "@/features/auth/change-password/components/ChangePasswordLayout";

export const metadata: Metadata = {
  title: "Change Password | Member Dashboard",
  description: "Change your account password",
};

export default async function ChangePasswordPage() {
  await requireAuth();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <ChangePasswordLayout />
    </div>
  );
}
