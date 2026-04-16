import { SettingsList } from "@/features/settings/components/SettingsList";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
  description: "Manage system settings",
};

export default async function SettingsPage() {
  await requireAdmin();
  return (
    <div className="container mx-auto py-10 px-4">
      <SettingsList />
    </div>
  );
}
