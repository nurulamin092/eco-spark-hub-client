import { SessionsList } from "@/features/auth/sessions/components/SessionsList";
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Sessions | EcoSpark Hub",
  description: "Manage your active sessions",
};

export default async function SessionsPage() {
  await requireAuth();

  return (
    <div className="container max-w-3xl mx-auto py-10">
      <SessionsList />
    </div>
  );
}
