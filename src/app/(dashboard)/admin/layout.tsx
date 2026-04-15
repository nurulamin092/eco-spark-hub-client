import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query/queryClient";
import { adminStatsService } from "@/features/admin/services/adminStats.service";
import { adminIdeasService } from "@/features/admin/services/adminIdeas.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ✅ Admin query keys
const adminQueryKeys = {
  dashboard: ["admin", "dashboard"] as const,
  stats: () => ["admin", "stats"] as const,
  pendingIdeas: (page?: number) =>
    ["admin", "pending-ideas", { page }] as const,
  topIdeas: () => ["admin", "top-ideas"] as const,
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Auth check - await cookies()
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/login");
  }

  const queryClient = getQueryClient();

  // ✅ Parallel prefetching with correct methods
  await Promise.allSettled([
    // Prefetch dashboard data
    queryClient.prefetchQuery({
      queryKey: adminQueryKeys.dashboard,
      queryFn: async () => {
        const response = await adminStatsService.getDashboard();
        return response.data;
      },
      staleTime: 5 * 60 * 1000,
    }),

    // Prefetch pending ideas
    queryClient.prefetchQuery({
      queryKey: adminQueryKeys.pendingIdeas(1),
      queryFn: async () => {
        const response = await adminIdeasService.getPendingIdeas();
        return response;
      },
      staleTime: 30 * 1000,
    }),

    // Prefetch top ideas
    queryClient.prefetchQuery({
      queryKey: adminQueryKeys.topIdeas(),
      queryFn: async () => {
        const response = await adminIdeasService.getTopIdeas();
        return response;
      },
      staleTime: 10 * 60 * 1000,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">{children}</div>
      </div>
    </HydrationBoundary>
  );
}
