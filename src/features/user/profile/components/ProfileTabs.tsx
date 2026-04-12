"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./ProfileForm";
import { ChangePasswordForm } from "@/features/auth/change-password/components/ChangePasswordForm";
import { SessionsList } from "@/features/auth/sessions/components/SessionsList";
import { usePathname, useRouter } from "next/navigation";

export function ProfileTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = pathname?.split("/").pop() || "profile";

  const handleTabChange = (value: string) => {
    router.push(`/member/${value}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="change-password">Password</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileForm />
      </TabsContent>

      <TabsContent value="change-password" className="mt-6">
        <ChangePasswordForm />
      </TabsContent>

      <TabsContent value="sessions" className="mt-6">
        <SessionsList />
      </TabsContent>
    </Tabs>
  );
}
