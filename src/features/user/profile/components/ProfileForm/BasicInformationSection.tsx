/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProfileImageUpload } from "@/features/upload";
import { AppField } from "@/components/shared/form/AppField";

type BasicInformationSectionProps = {
  form: any;
  isPending: boolean;
};

export function BasicInformationSection({
  form,
  isPending,
}: BasicInformationSectionProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-border/50
        bg-card
        p-6
        space-y-6
      "
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <p className="text-sm text-muted-foreground">
          Update your name, email address and profile picture.
        </p>
      </div>

      {/* Profile Image */}
      <div
        className="
          flex
          flex-col
          items-center
          rounded-2xl
          border
          border-dashed
          border-border/60
          bg-muted/20
          p-6
          space-y-3
        "
      >
        <ProfileImageUpload />

        <p className="text-sm text-muted-foreground text-center">
          Click the camera icon to upload a new profile picture.
        </p>
      </div>

      {/* Name */}
      <form.Field name="name">
        {(field: any) => (
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

      {/* Email */}
      <form.Field name="email">
        {(field: any) => (
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
    </section>
  );
}
