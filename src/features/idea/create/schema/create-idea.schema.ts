import { z } from "zod";

export const createIdeaSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title cannot exceed 200 characters"),

    problem: z
      .string()
      .min(10, "Problem statement must be at least 10 characters")
      .max(5000, "Problem cannot exceed 5000 characters"),

    solution: z
      .string()
      .min(10, "Solution must be at least 10 characters")
      .max(5000, "Solution cannot exceed 5000 characters"),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(10000, "Description cannot exceed 10000 characters"),

    categoryId: z.string().uuid("Please select a valid category"),

    isPaid: z.boolean().optional().default(false),

    price: z
      .number()
      .positive("Price must be positive")
      .max(999999.99, "Price cannot exceed 999,999.99")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.isPaid && (!data.price || data.price <= 0)) {
        return false;
      }
      return true;
    },
    {
      message: "Price is required for paid ideas",
      path: ["price"],
    },
  );

export type CreateIdeaFormValues = z.infer<typeof createIdeaSchema>;
