import { EditCategoryForm } from "@/features/category/edit/components/EditCategoryForm";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

interface EditCategoryPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Edit Category | Admin Dashboard",
  description: "Update category information",
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  await requireAdmin();

  const { id } = params;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <EditCategoryForm categoryId={id} />
    </div>
  );
}
