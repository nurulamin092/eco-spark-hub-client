import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";
import { MembersList } from "@/features/admin/components/members/MembersList";

export const metadata: Metadata = {
  title: "Members | Admin Dashboard",
  description: "Manage all registered members of EcoSpark Hub",
};

export default async function AdminMembersPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto py-10 px-4">
      <MembersList />
    </div>
  );
}
