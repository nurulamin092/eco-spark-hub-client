import { z } from "zod";
import {
  emailSchema,
  passwordSchema,
} from "../../shared/schemas/common.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
