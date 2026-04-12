import { BookmarkList } from "@/features/bookmark/components/BookmarkList";
import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";

export const metadata: Metadata = {
  title: "My Bookmarks | EcoSpark Hub",
  description: "View your saved ideas",
};

export default async function BookmarksPage() {
  await requireAuth();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <BookmarkList />
    </div>
  );
}
