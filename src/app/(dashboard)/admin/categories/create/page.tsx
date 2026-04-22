// ============ src/app/(dashboard)/admin/categories/create/page.tsx ============
import { CreateCategoryForm } from "@/features/category";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Create Category | Admin Dashboard",
  description: "Add a new category",
};

export default async function CreateCategoryPage() {
  await requireAdmin();
  return <CreateCategoryForm />;
}
