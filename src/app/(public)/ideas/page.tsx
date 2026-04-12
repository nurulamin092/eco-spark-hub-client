import { Metadata } from "next";
import { IdeaListWrapper } from "@/features/idea/list/components/IdeaListWrapper";

export const metadata: Metadata = {
  title: "Explore Ideas | EcoSpark Hub",
  description: "Discover innovative sustainability ideas from our community",
};

export default function IdeasPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Explore Sustainability Ideas
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover innovative solutions from our community of changemakers
        </p>
      </div>
      <IdeaListWrapper />
    </div>
  );
}
