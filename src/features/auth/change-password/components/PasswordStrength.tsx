"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type PasswordStrengthProps = {
  password: string;
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passedRules = rules.filter((rule) => rule.valid).length;

  const progress = (passedRules / rules.length) * 100;

  const strength =
    passedRules <= 1
      ? "Weak"
      : passedRules <= 3
        ? "Medium"
        : passedRules === 4
          ? "Strong"
          : "Very Strong";

  const strengthColor =
    passedRules <= 1
      ? "text-red-500"
      : passedRules <= 3
        ? "text-yellow-500"
        : passedRules === 4
          ? "text-green-500"
          : "text-emerald-500";

  if (!password) return null;

  return (
    <div
      className="
        rounded-2xl
        border
        border-border/50
        bg-muted/20
        p-5
        space-y-5
      "
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Password Strength</h3>

          <span className={`text-sm font-semibold ${strengthColor}`}>
            {strength}
          </span>
        </div>

        <Progress value={progress} className="mt-3 h-2" />
      </div>

      <div className="space-y-2">
        {rules.map((rule) => (
          <div key={rule.label} className="flex items-center gap-3 text-sm">
            {rule.valid ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}

            <span
              className={
                rule.valid ? "text-foreground" : "text-muted-foreground"
              }
            >
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
