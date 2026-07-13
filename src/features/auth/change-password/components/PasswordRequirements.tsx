"use client";

import { Check, X } from "lucide-react";

type PasswordRequirementsProps = {
  password: string;
};

const requirements = [
  {
    label: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "One lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "One number",
    test: (password: string) => /\d/.test(password),
  },
  {
    label: "One special character",
    test: (password: string) =>
      /[!@#$%^&*()_\-+={[}\]|\\:;"'<>,.?/~`]/.test(password),
  },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border/60
        bg-muted/30
        p-5
      "
    >
      <h4 className="mb-4 text-sm font-semibold">Password Requirements</h4>

      <div className="space-y-3">
        {requirements.map((requirement) => {
          const passed = requirement.test(password);

          return (
            <div key={requirement.label} className="flex items-center gap-3">
              <div
                className={`
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  transition-colors
                  ${
                    passed
                      ? "bg-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {passed ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </div>

              <span
                className={`
                  text-sm
                  transition-colors
                  ${
                    passed
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground"
                  }
                `}
              >
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
