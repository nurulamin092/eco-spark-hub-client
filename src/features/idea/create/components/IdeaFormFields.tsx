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
  required?: boolean;
}

export function IdeaFormFields({
  field,
  label,
  type = "text",
  placeholder,
  rows = 4,
  options = [],
  disabled = false,
  required = false,
}: IdeaFormFieldsProps) {
  const value = field.state.value;
  const errors = field.state.meta.errors ?? [];
  const hasError = field.state.meta.isTouched && errors.length > 0;

  const handleChange = useCallback(
    (val: unknown) => {
      field.handleChange(val);
      field.handleBlur();
    },
    [field],
  );

  //  FIXED: Number change handler - uses null instead of undefined
  const handleNumberChange = useCallback(
    (val: string) => {
      if (val === "") {
        // CRITICAL: Use null, not undefined (matches Prisma schema)
        field.handleChange(null);
        field.handleBlur();
      } else {
        const parsed = Number(val);
        // Only set valid positive numbers
        if (!isNaN(parsed) && parsed > 0) {
          field.handleChange(parsed);
        } else {
          field.handleChange(null);
        }
        field.handleBlur();
      }
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
            aria-required={required}
            aria-invalid={hasError}
          />
        );

      case "select":
        return (
          <Select
            value={(value as string) ?? ""}
            onValueChange={handleChange}
            disabled={disabled || options.length === 0}
          >
            <SelectTrigger aria-required={required} aria-invalid={hasError}>
              <SelectValue placeholder={placeholder ?? "Select a category"} />
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

      //  FIXED: Number field with proper null handling
      case "number":
        return (
          <Input
            id={field.name}
            name={field.name}
            type="number"
            step="0.01"
            min="0.5"
            placeholder={placeholder}
            value={value === null || value === undefined ? "" : value}
            onBlur={field.handleBlur}
            onChange={(e) => handleNumberChange(e.target.value)}
            disabled={disabled}
            aria-required={required}
            aria-invalid={hasError}
          />
        );

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={field.name} className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
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
            aria-required={required}
            aria-invalid={hasError}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {type !== "switch" && (
        <Label htmlFor={field.name} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      {renderField()}

      {hasError && (
        <p className="text-sm text-destructive">{String(errors[0])}</p>
      )}
    </div>
  );
}
