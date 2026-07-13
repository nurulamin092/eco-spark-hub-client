"use client";

import { LoginActivityCard } from "./SecurityPanel/LoginActivityCard";
import { SecurityStatusCard } from "./SecurityPanel/SecurityStatusCard";
import { PasswordCard } from "./SecurityPanel/PasswordCard";
import { TwoFactorCard } from "./SecurityPanel/TwoFactorCard";
import { SessionsCard } from "./SecurityPanel/SessionsCard";

export function SecurityPanel() {
  return (
    <div className="space-y-6">
      <SecurityStatusCard />

      <PasswordCard />

      <TwoFactorCard />

      <SessionsCard />

      <LoginActivityCard />
    </div>
  );
}
