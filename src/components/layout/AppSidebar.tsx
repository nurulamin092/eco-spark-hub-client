// ============ src/components/layout/AppSidebar.tsx ============
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Lightbulb,
  Bookmark,
  CreditCard,
  User,
  Settings,
  LogOut,
  Shield,
  Users,
  FolderTree,
} from "lucide-react";
import { useAuth } from "@/features/auth/shared/hooks/useAuth";

const memberNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Ideas", href: "/member/ideas", icon: Lightbulb },
  { title: "Bookmarks", href: "/member/bookmarks", icon: Bookmark },
  { title: "Payments", href: "/member/payments", icon: CreditCard },
  { title: "Profile", href: "/member/profile", icon: User },
  { title: "Settings", href: "/member/settings", icon: Settings },
];

const adminNavItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Categories", href: "/admin/categories", icon: FolderTree },
  { title: "User", href: "/admin/users", icon: Users },
  { title: "Ideas", href: "/admin/ideas", icon: Lightbulb },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Reports", href: "/admin/reports", icon: Shield },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const navItems = isAdmin ? adminNavItems : memberNavItems;

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.href ||
                      pathname?.startsWith(item.href + "/")
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => logout()} tooltip="Logout">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
