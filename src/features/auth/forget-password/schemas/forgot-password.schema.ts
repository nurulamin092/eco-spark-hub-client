import { z } from "zod";
import {
  emailSchema,
  passwordSchema,
} from "../../shared/schemas/common.schema";

// Step 1: Request OTP
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Step 2: Verify OTP
export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Step 3: Reset Password
export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
