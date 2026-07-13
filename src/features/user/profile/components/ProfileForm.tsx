/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { profileSchema, ProfileFormValues } from "../schema/profile.schema";

import { BasicInformationSection } from "./ProfileForm/BasicInformationSection";
import { ContactInformationSection } from "./ProfileForm/ContactInformationSection";
import { AboutSection } from "./ProfileForm/AboutSection";
import { SaveSection } from "./ProfileForm/SaveSection";

export function ProfileForm() {
  const { profile, isLoading: isProfileLoading } = useProfile();

  const { mutateAsync, isPending } = useUpdateProfile();

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      bio: profile?.bio || "",
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

            if (typeof path === "string") {
              errors[path] = issue.message;
            }
          });

          return errors;
        }

        return undefined;
      },
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.update({
      defaultValues: {
        name: profile.name ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        address: profile.address ?? "",
        bio: profile.bio ?? "",
      },
    });
  }, [profile, form]);

  if (isProfileLoading) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="
        glass
        border-gradient
        rounded-3xl
        shadow-card
      "
    >
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>

        <CardDescription>
          Keep your personal information up to date.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <BasicInformationSection form={form} isPending={isPending} />

          <ContactInformationSection form={form} isPending={isPending} />

          <AboutSection form={form} isPending={isPending} />

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <SaveSection isPending={isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
