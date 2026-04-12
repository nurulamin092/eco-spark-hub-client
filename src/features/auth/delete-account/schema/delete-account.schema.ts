import { z } from "zod";
import { passwordSchema } from "../../shared/schemas/common.schema";

export const deleteAccountSchema = z
  .object({
    password: passwordSchema,
    confirmText: z.string().min(1, "Please type DELETE to confirm"),
  })
  .refine((data) => data.confirmText === "DELETE", {
    message: 'Please type "DELETE" to confirm account deletion',
    path: ["confirmText"],
  });

export type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>;
