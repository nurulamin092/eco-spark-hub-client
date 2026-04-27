// ============ src/app/(dashboard)/admin/ideas/[id]/page.tsx ============
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";
import { AdminIdeaDetails } from "@/features/admin/components/ideas/AdminIdeaDetails";

interface AdminIdeaDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Idea Details | Admin Dashboard",
  description: "View and moderate idea details",
};

export default async function AdminIdeaDetailPage({
  params,
}: AdminIdeaDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  return (
    <div className="max-w-5xl mx-auto">
      <AdminIdeaDetails ideaId={id} />
    </div>
  );
}
