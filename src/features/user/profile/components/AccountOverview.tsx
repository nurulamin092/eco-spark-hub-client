import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AccountOverviewProps = {
  profile: {
    name: string;
    email: string;
    image?: string | null;
    phone?: string | null;
    address?: string | null;
    role: string;
    isVerified?: boolean;
  };
};

export function AccountOverview({ profile }: AccountOverviewProps) {
  return (
    <section
      className="
        glass
        border-gradient
        relative
        overflow-hidden
        rounded-3xl
        p-8
        shadow-card
      "
    >
      {/* Background Blur */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-20
            -top-20
            h-72
            w-72
            rounded-full
            bg-primary/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-60
            w-60
            rounded-full
            bg-emerald-500/10
            blur-[120px]
          "
        />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24 ring-4 ring-primary/15">
            <AvatarImage src={profile.image ?? ""} />
            <AvatarFallback className="text-2xl font-bold">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {profile.name}
              </h1>

              <p className="mt-1 text-muted-foreground">
                Manage your personal information and account settings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-primary/20
                  bg-primary/5
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-primary
                "
              >
                <Shield className="h-4 w-4" />
                {profile.role}
              </div>

              {profile.isVerified && (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-emerald-600
                  "
                >
                  <Shield className="h-4 w-4" />
                  Verified
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <Link href="/member/change-password">
          <Button
            size="lg"
            className="
              rounded-xl
              px-6
              shadow-card
            "
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Info Grid */}

      <div className="relative mt-10 grid gap-5 md:grid-cols-3">
        <div
          className="
            rounded-2xl
            border
            border-border/60
            bg-background/40
            p-5
          "
        >
          <Mail className="mb-3 h-5 w-5 text-primary" />

          <p className="text-xs uppercase text-muted-foreground">Email</p>

          <p className="mt-1 font-medium break-all">{profile.email}</p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-border/60
            bg-background/40
            p-5
          "
        >
          <Phone className="mb-3 h-5 w-5 text-primary" />

          <p className="text-xs uppercase text-muted-foreground">Phone</p>

          <p className="mt-1 font-medium">{profile.phone || "Not added"}</p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-border/60
            bg-background/40
            p-5
          "
        >
          <MapPin className="mb-3 h-5 w-5 text-primary" />

          <p className="text-xs uppercase text-muted-foreground">Address</p>

          <p className="mt-1 font-medium">{profile.address || "Not added"}</p>
        </div>
      </div>

      {/* Bottom Stats */}

      <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
        <div
          className="
            rounded-xl
            border
            border-border/50
            p-4
          "
        >
          <p className="text-sm text-muted-foreground">Account Status</p>

          <p className="mt-1 font-semibold text-primary">Active</p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-border/50
            p-4
          "
        >
          <p className="text-sm text-muted-foreground">Security</p>

          <p className="mt-1 font-semibold">Protected</p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-border/50
            p-4
          "
        >
          <p className="text-sm text-muted-foreground">Profile</p>

          <p className="mt-1 font-semibold">
            {profile.image ? "Complete" : "Incomplete"}
          </p>
        </div>
      </div>
    </section>
  );
}
