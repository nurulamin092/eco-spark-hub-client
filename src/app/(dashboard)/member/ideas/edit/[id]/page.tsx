// ============ src/app/(dashboard)/member/ideas/edit/[id]/page.tsx (FIXED) ============
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";
import { EditIdeaForm } from "@/features/idea/edit/components/EditIdeaForm"; // ✅ সঠিক ইম্পোর্ট

interface EditIdeaPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Idea | Member Dashboard",
  description: "Edit your submitted idea",
};

export default async function EditIdeaPage({ params }: EditIdeaPageProps) {
  await requireAuth();
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto">
      <EditIdeaForm ideaId={id} />
    </div>
  );
}
