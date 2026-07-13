"use client";

import Link from "next/link";
import { BadgeCheck, CalendarDays, ChevronRight, Shield } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type SettingsHeroProps = {
  profile: {
    name: string;
    email: string;
    image?: string | null;
    role: string;
    isVerified?: boolean;
    createdAt?: string;
  };
};

export function SettingsHero({ profile }: SettingsHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card shadow-xl">
      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={profile.image ?? ""} />

            <AvatarFallback className="text-2xl font-bold">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>

              <p className="text-muted-foreground">{profile.email}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <Shield className="h-4 w-4" />

                {profile.role}
              </div>

              {profile.isVerified && (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-600">
                  <BadgeCheck className="h-4 w-4" />
                  Verified
                </div>
              )}

              {profile.createdAt && (
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                  <CalendarDays className="h-4 w-4" />
                  Joined {new Date(profile.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col gap-4">
          <Link href="/member/change-password">
            <Button size="lg" className="min-w-55 rounded-xl">
              Manage Security
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
