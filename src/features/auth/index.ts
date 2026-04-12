export {
  LoginForm,
  useLoginForm,
  useLoginMutation,
  loginSchema,
} from "./login";

export type { LoginFormValues } from "./login";

// Register
export {
  RegisterForm,
  useRegisterForm,
  useRegisterMutation,
  registerSchema,
} from "./register";

export type { RegisterFormValues } from "./register";

// Forgot Password
export {
  ForgotPasswordForm,
  useForgotPassword,
  useVerifyOtp,
  useResetPassword,
  useForgotPasswordForm,
  useResetPasswordForm,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from "./forget-password";
export type {
  ForgotPasswordFormValues,
  VerifyOtpFormValues,
  ResetPasswordFormValues,
} from "./forget-password";

// Verify Email
export {
  VerifyEmailForm,
  ResendOtpButton,
  useVerifyEmail,
  useResendOtp,
  verifyEmailSchema,
  resendOtpSchema,
} from "./verify-email";
export type {
  VerifyEmailFormValues,
  ResendOtpFormValues,
} from "./verify-email";

// Change Password
export {
  ChangePasswordForm,
  useChangePassword,
  useChangePasswordForm,
  changePasswordSchema,
} from "./change-password";
export type { ChangePasswordFormValues } from "./change-password";

// Sessions
export {
  SessionsList,
  SessionCard,
  RevokeAllButton,
  useSessions,
  useRevokeSession,
  useRevokeAllSessions,
} from "./sessions";
export type { Session, SessionsResponse } from "./sessions";

// Delete Account
export {
  DeleteAccountButton,
  DeleteAccountModal,
  useDeleteAccount,
  deleteAccountSchema,
} from "./delete-account";
export type { DeleteAccountFormValues } from "./delete-account";
// Shared
export { useAuth } from "./shared/hooks/useAuth";
export { authService } from "./shared/services/auth.service";
export { SocialLoginButtons } from "./shared/components/SocialLoginButtons";
export type {
  User,
  AuthResponse,
  AuthContextType,
} from "./shared/types/auth.types";
