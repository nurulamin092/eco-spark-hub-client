"use client";

import { Shield, TriangleAlert, User, Settings2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type Tab = "profile" | "security" | "preferences" | "danger";

type SettingsNavigationProps = {
  value: Tab;
  onChange: (tab: Tab) => void;
};

const items = [
  {
    value: "profile",
    label: "Profile",
    icon: User,
  },
  {
    value: "security",
    label: "Security",
    icon: Shield,
  },
  {
    value: "preferences",
    label: "Preferences",
    icon: Settings2,
  },
  {
    value: "danger",
    label: "Danger Zone",
    icon: TriangleAlert,
  },
] as const;

export function SettingsNavigation({
  value,
  onChange,
}: SettingsNavigationProps) {
  return (
    <nav
      className="
        glass
        border-gradient
        rounded-2xl
        p-2
        shadow-card
      "
    >
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          const active = value === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className={cn(
                `
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                `,
                active
                  ? `
                      bg-primary
                      text-primary-foreground
                      shadow-lg
                    `
                  : `
                      text-muted-foreground
                      hover:bg-muted
                      hover:text-foreground
                    `,
              )}
            >
              <Icon className="h-4 w-4" />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
