import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";
import { UsersList } from "@/features/admin/components/users/UsersList";

export const metadata: Metadata = {
  title: "Users | Admin Dashboard",
  description: "Manage all registered users of EcoSpark Hub",
};

export default async function AdminUsersPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto py-10 px-4">
      <UsersList />
    </div>
  );
}
