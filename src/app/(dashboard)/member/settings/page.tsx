import { Metadata } from "next";

import { requireAuth } from "@/lib/api/auth.guard";

import { SettingsTabs } from "@/features/user/profile/components/SettingsTabs";

export const metadata: Metadata = {
  title: "Account Settings | EcoSpark Hub",
  description: "Manage your EcoSpark Hub account settings",
};

export default async function SettingsPage() {
  await requireAuth();

  return <SettingsTabs />;
}
