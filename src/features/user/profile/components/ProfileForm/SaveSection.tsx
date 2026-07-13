"use client";

import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";

type SaveSectionProps = {
  isPending: boolean;
};

export function SaveSection({ isPending }: SaveSectionProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-border/50
        bg-card
        p-6
      "
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Save Changes</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Your profile information will be updated immediately after saving.
          </p>
        </div>

        <div className="min-w-45">
          <AppSubmitButton
            isPending={isPending}
            text="Save Changes"
            loadingText="Saving..."
          />
        </div>
      </div>
    </section>
  );
}
