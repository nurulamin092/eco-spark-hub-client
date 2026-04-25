// ============ src/features/idea/list/components/IdeaFilters.tsx ============
"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryService } from "@/features/category/shared/services/category.service";

interface IdeaFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export function IdeaFilters({ value, onChange }: IdeaFiltersProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const selectedValue = value || "all";

  const handleChange = (val: string) => {
    onChange(val === "all" ? "" : val);
  };

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-40">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
