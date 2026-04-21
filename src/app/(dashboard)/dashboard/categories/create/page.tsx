import { CreateCategoryForm } from "@/features/category/create/components/CreateCategoryForm";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "Create Category | Admin Dashboard",
  description: "Add a new category",
};

export default async function CreateCategoryPage() {
  await requireAdmin();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <CreateCategoryForm />
    </div>
  );
}
