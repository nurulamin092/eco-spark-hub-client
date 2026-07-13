"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ArrowLeft, Lock } from "lucide-react";

import { useChangePasswordForm } from "../hooks/useChangePasswordForm";
import { AppField } from "@/components/shared/form/AppField";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordRequirements } from "./PasswordRequirements";

export function ChangePasswordForm() {
  const {
    form,
    isPending,
    serverError,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
  } = useChangePasswordForm();

  const newPassword = form.getFieldValue("newPassword");

  return (
    <Card
      className="
        mx-auto
        w-full
        max-w-2xl
        rounded-3xl
        glass
        border-gradient
        shadow-card
      "
    >
      <CardHeader className="border-b border-border/40 pb-6">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
            "
          >
            <Lock className="h-6 w-6 text-primary" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold">
              Change Password
            </CardTitle>

            <CardDescription className="mt-1">
              Update your password to keep your account secure.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Current Password */}
          <form.Field name="currentPassword">
            {(field) => (
              <AppField
                name={field.name}
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* New Password */}
          <form.Field name="newPassword">
            {(field) => (
              <AppField
                name={field.name}
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => (
              <AppField
                name={field.name}
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0] as string | undefined}
                disabled={isPending}
                append={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Password Validation */}
          <PasswordRequirements password={newPassword} />

          <PasswordStrength password={newPassword} />

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3 pt-2">
            <p className="text-center text-sm text-muted-foreground">
              Changing your password may sign you out from other active devices.
            </p>

            <AppSubmitButton
              isPending={isPending}
              text="Update Password"
              loadingText="Updating..."
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="border-t border-border/40 pt-5">
        <Link
          href="/member/settings"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
            transition-colors
            hover:text-foreground
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account Settings
        </Link>
      </CardFooter>
    </Card>
  );
}
