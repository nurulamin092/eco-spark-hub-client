"use client";

import { ChangePasswordForm } from "./ChangePasswordForm";

export function ChangePasswordLayout() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <ChangePasswordForm />
    </div>
  );
}
