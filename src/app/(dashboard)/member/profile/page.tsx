import { ProfileForm } from "@/features/user/profile/components/ProfileForm";
import { requireAuth } from "@/lib/api/auth.guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | EcoSpark Hub",
  description: "Manage your profile settings",
};

export default async function ProfilePage() {
  await requireAuth();

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <ProfileForm />
    </div>
  );
}
