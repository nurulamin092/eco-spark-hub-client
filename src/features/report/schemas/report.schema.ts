import { z } from "zod";

export const createReportSchema = z
  .object({
    type: z.enum(["IDEA", "COMMENT"]),
    ideaId: z.string().uuid().optional(),
    commentId: z.string().uuid().optional(),
    reason: z.string().min(3, "Reason must be at least 3 characters"),
    details: z
      .string()
      .max(500, "Details cannot exceed 500 characters")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === "IDEA" && !data.ideaId) return false;
      if (data.type === "COMMENT" && !data.commentId) return false;
      return true;
    },
    { message: "Valid ID is required for the selected type" },
  );

export const updateReportStatusSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "DISMISSED", "ACTION_TAKEN"]),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

export type CreateReportFormValues = z.infer<typeof createReportSchema>;
export type UpdateReportStatusFormValues = z.infer<
  typeof updateReportStatusSchema
>;
