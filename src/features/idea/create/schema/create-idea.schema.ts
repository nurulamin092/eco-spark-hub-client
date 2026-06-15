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

    categoryId: z.string().min(1, "Please select a category"),

    isPaid: z.boolean().default(false),

    price: z.number().nullable().optional(),
  })
  .refine(
    (data) => {
      // If not paid, always valid
      if (!data.isPaid) return true;

      // If paid, price must exist and be >= 0.5 and <= 999
      return (
        data.price !== null &&
        data.price !== undefined &&
        data.price >= 0.5 &&
        data.price <= 999
      );
    },
    {
      message:
        "Valid price (min $0.50, max $999) is required for premium content",
      path: ["price"],
    },
  );

export type CreateIdeaFormValues = z.infer<typeof createIdeaSchema>;
