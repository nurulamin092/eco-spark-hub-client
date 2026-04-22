// ============ src/app/(dashboard)/admin/categories/page.tsx ============
import { Metadata } from "next";
import { requireAdmin } from "@/lib/api/auth.guard";
import { CategoryList } from "@/features/category/components/CategoryList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories | Admin Dashboard",
  description: "Manage idea categories",
};

export default async function CategoriesPage() {
  await requireAdmin();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage idea categories</p>
        </div>
        <Link href="/admin/categories/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>
      <CategoryList />
    </div>
  );
}
