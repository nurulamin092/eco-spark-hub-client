/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { ProfileAvatar } from "./ProfileAvatar";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { profileSchema, ProfileFormValues } from "../schema/profile.schema";
import { AppField } from "@/components/shared/form/AppField";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";
import { DangerZone } from "./DangerZone";

export function ProfileForm() {
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { mutateAsync, isPending } = useUpdateProfile();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
    } as ProfileFormValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await mutateAsync(value);
      } catch (error: any) {
        setServerError(error.message);
      }
    },
    validators: {
      onChange: ({ value }) => {
        const result = profileSchema.safeParse(value);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.issues.forEach((issue) => {
            const path = issue.path[0];
            if (path && typeof path === "string") {
              errors[path] = issue.message;
            }
          });
          return errors;
        }
        return undefined;
      },
    },
  });

  // Update form values when profile loads
  useEffect(() => {
    if (profile) {
      form.update({
        defaultValues: {
          name: profile?.name ?? "",
          email: profile?.email ?? "",
          bio: profile?.bio ?? "",
          phone: profile?.phone ?? "",
          address: profile?.address ?? "",
        },
      });
    }
  }, [profile, form]);

  if (isProfileLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-10">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information and profile picture
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ProfileAvatar />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field name="name">
              {(field) => (
                <AppField
                  name={field.name}
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors?.[0] as string | undefined}
                  disabled={isPending}
                />
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <AppField
                  name={field.name}
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors?.[0] as string | undefined}
                  disabled={isPending}
                />
              )}
            </form.Field>

            <form.Field name="phone">
              {(field) => (
                <AppField
                  name={field.name}
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors?.[0] as string | undefined}
                  disabled={isPending}
                />
              )}
            </form.Field>

            <form.Field name="bio">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    name={field.name}
                    placeholder="Tell us about yourself"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                    className="w-full min-h-25 rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  {field.state.meta.errors?.[0] && (
                    <p className="text-sm text-destructive">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="address">
              {(field) => (
                <AppField
                  name={field.name}
                  label="Address"
                  type="text"
                  placeholder="Enter your address"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors?.[0] as string | undefined}
                  disabled={isPending}
                />
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <AppSubmitButton
              isPending={isPending}
              text="Save Changes"
              loadingText="Saving..."
            />
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Your information is safe with us
          </p>
        </CardFooter>
      </Card>
      <DangerZone />
    </div>
  );
}
