/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

type AboutSectionProps = {
  form: any;
  isPending: boolean;
};

export function AboutSection({ form, isPending }: AboutSectionProps) {
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
        <h3 className="text-lg font-semibold">About You</h3>

        <p className="text-sm text-muted-foreground">
          Write a short introduction about yourself.
        </p>
      </div>

      <form.Field name="bio">
        {(field: any) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Bio
            </label>

            <textarea
              id={field.name}
              name={field.name}
              placeholder="Tell the community about yourself..."
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={isPending}
              rows={6}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-border
                bg-background
                px-4
                py-3
                text-sm
                transition-colors
                placeholder:text-muted-foreground
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

            {field.state.meta.errors?.[0] && (
              <p className="text-sm text-destructive">
                {String(field.state.meta.errors[0])}
              </p>
            )}
          </div>
        )}
      </form.Field>
    </section>
  );
}
