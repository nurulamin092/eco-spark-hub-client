"use client";

import { useProfile } from "@/features/user/profile/hooks/useProfile";

import { SettingsNavigation } from "./Settings/SettingsNavigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SettingsHero } from "./Settings/SettingsHero";
import { DangerZone } from "./DangerZone";
import { SecurityPanel } from "./SecurityPanel";
import { ProfileForm } from "./ProfileForm";

export function SettingsTabs() {
  const { profile, isLoading } = useProfile();
  const [tab, setTab] = useState<
    "profile" | "security" | "preferences" | "danger"
  >("profile");
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border p-8 text-center">
        <p className="text-muted-foreground">Unable to load your profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Header */}

      <SettingsHero profile={profile} />
      <SettingsNavigation value={tab} onChange={setTab} />
      {tab === "profile" && <ProfileForm />}

      {tab === "security" && <SecurityPanel />}

      {tab === "preferences" && (
        <div
          className="
      glass
      border-gradient
      rounded-3xl
      p-12
      text-center
      shadow-card
    "
        >
          <h2 className="text-2xl font-bold">Preferences</h2>

          <p className="mt-3 text-muted-foreground">
            Notification, appearance and privacy settings will be available
            soon.
          </p>
        </div>
      )}

      {tab === "danger" && <DangerZone />}
    </div>
  );
}
