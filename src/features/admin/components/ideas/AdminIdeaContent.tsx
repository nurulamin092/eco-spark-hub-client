// ============ src/features/admin/components/ideas/AdminIdeaContent.tsx ============
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Idea } from "@/features/idea/shared/types/idea.types";
import { ImageGallery } from "@/features/upload/components/ImageGallery";
import type { UploadedImage } from "@/features/upload";

interface AdminIdeaContentProps {
  idea: Idea;
}

function formatText(text: string | undefined | null): string {
  if (!text) return "No content available.";
  return text;
}

function renderParagraphs(text: string): React.ReactElement[] {
  return text
    .split("\n")
    .map((paragraph, idx) => <p key={idx}>{paragraph || "\u00A0"}</p>);
}

export function AdminIdeaContent({ idea }: AdminIdeaContentProps) {
  const images = (idea.images as UploadedImage[]) || [];
  const description = formatText(idea.description);
  const problem = formatText(idea.problem);
  const solution = formatText(idea.solution);

  return (
    <div className="space-y-6">
      {/* Admin Feedback Section (if rejected) */}
      {idea.status === "REJECTED" && idea.adminFeedback && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
            Admin Feedback
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300">
            {idea.adminFeedback}
          </p>
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Images</h3>
          <ImageGallery images={images} ideaId={idea.id} />
        </div>
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="problem">Problem</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4 space-y-4">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {renderParagraphs(description)}
          </div>
        </TabsContent>

        <TabsContent value="problem" className="mt-4 space-y-4">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3>The Problem We&apos;re Solving</h3>
            {renderParagraphs(problem)}
          </div>
        </TabsContent>

        <TabsContent value="solution" className="mt-4 space-y-4">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3>Our Proposed Solution</h3>
            {renderParagraphs(solution)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
