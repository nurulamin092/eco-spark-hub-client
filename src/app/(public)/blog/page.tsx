import { BlogList } from "@/features/blog/components/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | EcoSpark Hub",
  description:
    "Read the latest articles about sustainability and eco-friendly living",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">EcoSpark Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Insights, stories, and updates from our community
        </p>
      </div>
      <BlogList />
    </div>
  );
}
