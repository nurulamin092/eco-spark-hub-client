// ============ src/app/(dashboard)/member/activity/page.tsx ============
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";
import { ActivityFeed } from "@/features/activity/components/ActivityFeed";

export const metadata: Metadata = {
  title: "My Activity | Member Dashboard",
  description: "View your recent activities",
};

export default async function ActivityPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Activity</h1>
        <p className="text-muted-foreground">
          Your recent activities on the platform
        </p>
      </div>
      <ActivityFeed />
    </div>
  );
}
