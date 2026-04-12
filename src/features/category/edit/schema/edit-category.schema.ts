import { z } from "zod";
import {
  categoryNameSchema,
  categoryDescriptionSchema,
  categoryIconSchema,
  categoryColorSchema,
} from "../../shared/schemas/common.schema";

export const editCategorySchema = z.object({
  name: categoryNameSchema.optional(),
  description: categoryDescriptionSchema,
  icon: categoryIconSchema,
  color: categoryColorSchema,
  isActive: z.boolean().optional(),
});

export type EditCategoryFormValues = z.infer<typeof editCategorySchema>;
