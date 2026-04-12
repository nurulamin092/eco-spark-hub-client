"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Category } from "../../shared/types/category.types";
import { useState } from "react";
import { DeleteCategoryDialog } from "../../delete/components/DeleteCategoryDialog";

interface CategoryCardProps {
  category: Category;
  onDelete?: () => void;
}

export function CategoryCard({ category, onDelete }: CategoryCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {category.icon && (
                <span className="text-3xl">{category.icon}</span>
              )}
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color || undefined }}
              />
            </div>
            <div className="flex gap-1">
              <Link href={`/admin/categories/edit/${category.id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="mt-2">{category.name}</CardTitle>
        </CardHeader>
        {category.description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          </CardContent>
        )}
      </Card>

      <DeleteCategoryDialog
        categoryId={category.id}
        categoryName={category.name}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onSuccess={onDelete}
      />
    </>
  );
}
