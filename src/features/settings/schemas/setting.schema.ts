import { z } from "zod";

export const createSettingSchema = z
  .object({
    key: z
      .string()
      .min(2, "Key must be at least 2 characters")
      .max(100, "Key too long")
      .regex(
        /^[a-zA-Z_][a-zA-Z0-9_]*$/,
        "Invalid key format (use letters, numbers, underscores)",
      ),
    value: z.any(),
    type: z.enum(["STRING", "NUMBER", "BOOLEAN", "JSON"]),
    description: z.string().max(500, "Description too long").optional(),
    isPublic: z.boolean().optional().default(false),
  })
  .refine(
    (data) => {
      if (data.type === "NUMBER" && isNaN(Number(data.value))) return false;
      if (
        data.type === "BOOLEAN" &&
        !["true", "false", true, false].includes(data.value)
      )
        return false;
      return true;
    },
    { message: "Invalid value for selected type" },
  );

export const updateSettingSchema = z
  .object({
    value: z.any().optional(),
    description: z.string().max(500).optional(),
    isPublic: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.value !== undefined && isNaN(Number(data.value))) return false;
      return true;
    },
    { message: "Invalid value" },
  );

export type CreateSettingFormValues = z.infer<typeof createSettingSchema>;
export type UpdateSettingFormValues = z.infer<typeof updateSettingSchema>;
