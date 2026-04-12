export interface User {
  id: string;
  name: string;
  email: string;
  role: "MEMBER" | "ADMIN" | "SUPER_ADMIN";
  image?: string | null;
  emailVerified: boolean;
  bio?: string;
  phone?: string;
  address?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
    token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
    token: string;
  };
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: {
    emailVerified: boolean;
  };
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data?: {
    resendAt: string;
  };
}
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface AuthRedirectFooterProps {
  text: string;
  linkText: string;
  href: string;
}
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
  address?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface UploadAvatarResponse {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
  };
}

export interface DeleteAccountRequest {
  password: string;
  confirmText: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
