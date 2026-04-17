"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { queryKeys } from "@/lib/react-query/queryKeys";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryService } from "../../shared/services/category.service";

interface IdeaFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export function IdeaFilters({ value, onChange }: IdeaFiltersProps) {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const response = await categoryService.getAll();
      return response.data;
    },
  });

  const categories = categoriesData ?? [];

  const selectedValue = value || "all";

  const handleChange = (val: string) => {
    onChange(val === "all" ? "" : val);
  };

  return (
    <Select
      value={selectedValue}
      onValueChange={handleChange}
      disabled={isLoading} // ✅ disable while loading
    >
      <SelectTrigger className="w-45">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          <SelectValue placeholder="All Categories" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>

        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
