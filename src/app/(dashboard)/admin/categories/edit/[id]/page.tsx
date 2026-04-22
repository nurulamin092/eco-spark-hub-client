// ============ src/app/(dashboard)/admin/categories/edit/[id]/page.tsx ============
import { EditCategoryForm } from "@/features/category";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Category | Admin Dashboard",
  description: "Update category information",
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  await requireAdmin();
  const { id } = await params;
  return <EditCategoryForm categoryId={id} />;
}
