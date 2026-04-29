// src/app/(dashboard)/layout.tsx (updated)
"use client";

import { useAuth } from "@/features/auth/shared/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, error } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (error || !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, error, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="dashboard-layout relative flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <main className="flex-1 p-6 md:p-8">
            <div className="container mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
