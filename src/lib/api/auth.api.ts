/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ src/lib/api/auth.api.ts ============
import { apiClient } from "./base";
import type {
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
  UpdateProfileRequest,
} from "@/features/auth/shared/types/auth.types";

export type {
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
};
const forceClearAllAuthCookies = () => {
  if (typeof document === "undefined") return;

  console.log("🗑️ Force clearing all auth cookies...");

  // Multiple path variations to ensure complete cleanup
  const paths = ["/", "/admin", "/dashboard", "/member"];
  const domains = ["", "; domain=localhost", "; domain=.localhost"];

  const cookiesToDelete = [
    "accessToken",
    "refreshToken",
    "userRole",
    "role",
    "better-auth.session_token",
    "token",
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
  ];

  cookiesToDelete.forEach((cookieName) => {
    paths.forEach((path) => {
      domains.forEach((domain) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};${domain}`;
      });
    });
  });

  console.log("✅ All auth cookies force cleared");
};

class AuthApiService {
  private static instance: AuthApiService;

  private constructor() {}

  static getInstance(): AuthApiService {
    if (!AuthApiService.instance) {
      AuthApiService.instance = new AuthApiService();
    }
    return AuthApiService.instance;
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    console.log("📤 [auth.api] Login request for:", payload.email);
    const response = await apiClient.post("/auth/login", payload);
    console.log("📥 [auth.api] Login response status:", response.status);
    return response.data;
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  }

  async logout(): Promise<void> {
    console.log("📤 [auth.api] Starting logout process...");

    // STEP 1: Force clear ALL cookies immediately (critical)
    forceClearAllAuthCookies();

    // STEP 2: Clear all browser storage
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.clear();
      console.log("🗑️ Session storage cleared");
    }

    if (typeof localStorage !== "undefined") {
      const authKeys = [
        "auth-storage",
        "user",
        "persist:root",
        "token",
        "refreshToken",
      ];
      authKeys.forEach((key) => localStorage.removeItem(key));
      console.log("🗑️ Local storage auth items cleared");
    }

    // STEP 3: Try API logout (non-blocking)
    try {
      await Promise.race([
        apiClient.post("/auth/logout", {}, { timeout: 2000 }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Logout API timeout")), 2000),
        ),
      ]);
      console.log("✅ [auth.api] Logout API successful");
    } catch (apiError) {
      // Log but don't throw - cookies already cleared
      console.warn(
        "⚠️ [auth.api] Logout API failed, but cookies are already cleared:",
        apiError,
      );
    }

    // STEP 4: Double-check cookies are cleared (retry if needed)
    setTimeout(() => {
      const remainingCookies = document.cookie;
      if (
        remainingCookies.includes("userRole") ||
        remainingCookies.includes("accessToken")
      ) {
        console.warn("⚠️ Some cookies still present, force clearing again...");
        forceClearAllAuthCookies();
      } else {
        console.log("✅ All cookies successfully cleared");
      }
    }, 50);

    // STEP 5: Dispatch auth change event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth-state-change", {
          detail: { isAuthenticated: false, role: null },
        }),
      );
    }

    console.log(" [auth.api] Logout process completed");
  }

  async getMe(): Promise<User> {
    try {
      console.log("📤 [auth.api] Getting current user...");
      const response = await apiClient.get("/auth/me");

      if (response.data?.data) {
        return response.data.data;
      }
      if (response.data?.user) {
        return response.data.user;
      }
      if (response.data) {
        return response.data;
      }

      throw new Error("Invalid response structure");
    } catch (error: any) {
      const status = error.response?.status;
      console.log(`📥 [auth.api] getMe failed with status: ${status}`);
      throw error;
    }
  }

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await apiClient.post("/auth/change-password", payload);
  }

  async updateProfile(payload: UpdateProfileRequest): Promise<User> {
    const response = await apiClient.patch("/auth/profile", payload);
    return response.data.data.user;
  }

  async verifyEmail(email: string, otp: string): Promise<void> {
    await apiClient.post("/auth/verify-email", { email, otp });
  }

  async forgetPassword(email: string): Promise<void> {
    await apiClient.post("/auth/forget-password", { email });
  }

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<void> {
    await apiClient.post("/auth/reset-password", { email, otp, newPassword });
  }
}

export const authApi = AuthApiService.getInstance();
