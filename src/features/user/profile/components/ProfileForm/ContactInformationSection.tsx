/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppField } from "@/components/shared/form/AppField";
import { MapPin, Phone } from "lucide-react";

type ContactInformationSectionProps = {
  form: any;
  isPending: boolean;
};

export function ContactInformationSection({
  form,
  isPending,
}: ContactInformationSectionProps) {
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
        <h3 className="text-lg font-semibold">Contact Information</h3>

        <p className="text-sm text-muted-foreground">
          Update your phone number and address.
        </p>
      </div>

      {/* Phone */}
      <form.Field name="phone">
        {(field: any) => (
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
            append={<Phone className="h-4 w-4 text-muted-foreground" />}
          />
        )}
      </form.Field>

      {/* Address */}
      <form.Field name="address">
        {(field: any) => (
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
            append={<MapPin className="h-4 w-4 text-muted-foreground" />}
          />
        )}
      </form.Field>
    </section>
  );
}
