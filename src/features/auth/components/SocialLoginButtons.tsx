"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/shared/icons/GoogleIcon";
import { env } from "@/lib/config/env";

interface SocialLoginButtonsProps {
  isLoading?: boolean;
}

export function SocialLoginButtons({
  isLoading = false,
}: SocialLoginButtonsProps) {
  const handleGoogleLogin = () => {
    // Get base URL from config (type-safe)
    const baseUrl = env.NEXT_PUBLIC_API_URL;
    const googleAuthUrl = `${baseUrl}/auth/login/google`;

    // Store current path to redirect back after login
    const currentPath = window.location.pathname;
    sessionStorage.setItem("redirectAfterLogin", currentPath);

    // Full page redirect for OAuth
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <GoogleIcon />
        Sign in with Google
      </Button>
    </div>
  );
}
