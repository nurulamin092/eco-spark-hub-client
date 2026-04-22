// ============ src/features/category/components/CategoryCard.tsx ============
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

import { DeleteCategoryDialog } from "../delete/components/DeleteCategoryDialog";
import { useState } from "react";
import { Category } from "../shared/types/category.types";

interface CategoryCardProps {
  category: Category;
  onDelete?: () => void;
}

export function CategoryCard({ category, onDelete }: CategoryCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            {category.icon && <span className="text-2xl">{category.icon}</span>}
            <h3 className="font-semibold">{category.name}</h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/admin/categories/edit/${category.id}`}>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {category.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            {category.color && (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            )}
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "Active" : "Inactive"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Slug: {category.slug}
            </span>
          </div>
        </CardContent>
      </Card>

      <DeleteCategoryDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        categoryId={category.id}
        categoryName={category.name}
        onDeleted={onDelete}
      />
    </>
  );
}
