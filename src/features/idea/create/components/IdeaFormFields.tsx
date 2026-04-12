"use client";

import { useCallback } from "react";
import { AnyFieldApi } from "@tanstack/react-form";

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

interface IdeaFormFieldsProps {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "switch";
  placeholder?: string;
  rows?: number;
  options?: Category[];
  disabled?: boolean;
}

export function IdeaFormFields({
  field,
  label,
  type = "text",
  placeholder,
  rows = 4,
  options = [],
  disabled = false,
}: IdeaFormFieldsProps) {
  const value = field.state.value;
  const errors = field.state.meta.errors ?? [];
  const hasError = field.state.meta.isTouched && errors.length > 0;

  // generic change handler
  const handleChange = useCallback(
    (val: unknown) => {
      field.handleChange(val);
    },
    [field],
  );

  const handleNumberChange = useCallback(
    (val: string) => {
      const parsed = val === "" ? undefined : Number(val);
      field.handleChange(Number.isNaN(parsed) ? undefined : parsed);
    },
    [field],
  );

  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            name={field.name}
            placeholder={placeholder}
            value={(value as string) ?? ""}
            onBlur={field.handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            rows={rows}
            className="resize-y"
          />
        );

      case "select":
        return (
          <Select
            value={(value as string) ?? ""}
            onValueChange={handleChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder ?? "Select option"} />
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
            value={(value as number | undefined) ?? ""}
            onBlur={field.handleBlur}
            onChange={(e) => handleNumberChange(e.target.value)}
            disabled={disabled}
          />
        );

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={field.name}>{label}</Label>

            <Switch
              id={field.name}
              checked={Boolean(value)}
              onCheckedChange={handleChange}
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
            value={(value as string) ?? ""}
            onBlur={field.handleBlur}
            onChange={(e) => handleChange(e.target.value)}
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

      {hasError && (
        <p className="text-sm text-destructive">{String(errors[0])}</p>
      )}
    </div>
  );
}
