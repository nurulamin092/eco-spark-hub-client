import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(5000, "Comment too long"),
  ideaId: z.string().uuid("Invalid idea ID"),
  parentId: z.string().uuid().optional(),
});

export const updateCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(5000, "Comment too long"),
});

export type CreateCommentFormValues = z.infer<typeof createCommentSchema>;
export type UpdateCommentFormValues = z.infer<typeof updateCommentSchema>;
