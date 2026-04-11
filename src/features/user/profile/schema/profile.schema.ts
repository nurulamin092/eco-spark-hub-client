import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number")
    .optional(),
  address: z
    .string()
    .max(200, "Address cannot exceed 200 characters")
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
