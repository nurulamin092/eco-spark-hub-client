import { z } from "zod";
import { emailSchema } from "../../shared/schemas/common.schema";

export const verifyEmailSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export const resendOtpSchema = z.object({
  email: emailSchema,
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
export type ResendOtpFormValues = z.infer<typeof resendOtpSchema>;
