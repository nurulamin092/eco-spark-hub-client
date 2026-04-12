import { z } from "zod";
import {
  categoryNameSchema,
  categoryDescriptionSchema,
  categoryIconSchema,
  categoryColorSchema,
} from "../../shared/schemas/common.schema";

export const createCategorySchema = z.object({
  name: categoryNameSchema,
  description: categoryDescriptionSchema,
  icon: categoryIconSchema,
  color: categoryColorSchema,
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
