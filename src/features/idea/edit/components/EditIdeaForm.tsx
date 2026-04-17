"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Category } from "../../shared/types/idea.types";

// Field object type from TanStack Form
interface FormField {
  name: string;
  state: {
    value: unknown;
    meta: {
      errors: string[];
      isTouched: boolean;
    };
  };
  handleBlur: () => void;
  handleChange: (value: unknown) => void;
}

interface EditIdeaFormFieldsProps {
  field: FormField;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "switch";
  placeholder?: string;
  rows?: number;
  options?: Category[];
  disabled?: boolean;
}

export function EditIdeaFormFields({
  field,
  label,
  type = "text",
  placeholder,
  rows = 4,
  options = [],
  disabled = false,
}: EditIdeaFormFieldsProps) {
  const value = field.state.value;
  const error = field.state.meta.errors?.[0];

  const renderField = (): ReactNode => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            name={field.name}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={disabled}
            rows={rows}
            className="resize-y"
          />
        );

      case "select":
        return (
          <Select
            value={typeof value === "string" ? value : ""}
            onValueChange={(val) => field.handleChange(val)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <Input
            id={field.name}
            name={field.name}
            type="number"
            step="0.01"
            min="0"
            placeholder={placeholder}
            value={typeof value === "number" ? value : ""}
            onBlur={field.handleBlur}
            onChange={(e) =>
              field.handleChange(
                e.target.value ? parseFloat(e.target.value) : undefined,
              )
            }
            disabled={disabled}
          />
        );

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <Switch
              id={field.name}
              checked={typeof value === "boolean" ? value : false}
              onCheckedChange={(checked) => field.handleChange(checked)}
              disabled={disabled}
            />
          </div>
        );

      default:
        return (
          <Input
            id={field.name}
            name={field.name}
            type="text"
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {type !== "switch" && (
        <Label htmlFor={field.name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      {renderField()}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
