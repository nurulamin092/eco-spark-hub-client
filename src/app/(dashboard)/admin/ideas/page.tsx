import { MyIdeasList } from "@/features/idea/my-ideas/components/MyIdeasList";
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "My Ideas | EcoSpark Hub",
  description: "Manage your submitted ideas",
};

export default async function MyIdeasPage() {
  await requireAuth();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <MyIdeasList />
    </div>
  );
}
