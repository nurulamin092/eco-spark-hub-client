"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IdeaSortProps {
  value: "recent" | "top" | "commented" | "trending";
  onChange: (value: "recent" | "top" | "commented" | "trending") => void;
}

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "top", label: "Top Voted" },
  { value: "commented", label: "Most Commented" },
  { value: "trending", label: "Trending" },
];

export function IdeaSort({ value, onChange }: IdeaSortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
