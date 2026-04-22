// ============ src/features/category/shared/schemas/category.schema.ts ============
import { z } from "zod";

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional()
    .nullable(),
  icon: z.string().optional().nullable(),
  color: z
    .union([
      z
        .string()
        .regex(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Invalid color format (use hex like #10b981)",
        ),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => (val === "" || val === null ? undefined : val)),
  isActive: z.boolean().optional(),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional()
    .nullable(),
  icon: z.string().optional().nullable(),
  color: z
    .union([
      z
        .string()
        .regex(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Invalid color format (use hex like #10b981)",
        ),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => (val === "" || val === null ? undefined : val)),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;
