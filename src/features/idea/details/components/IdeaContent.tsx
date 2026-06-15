// ============ src/features/idea/details/components/IdeaContent.tsx ============
"use client";
import { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Idea } from "../../shared/types/idea.types";

interface IdeaContentProps {
  idea: Idea;
  isLocked?: boolean;
}

//  Safe text formatter
function formatText(text: string | undefined | null): string {
  if (!text) return "No content available.";
  return text;
}

function renderParagraphs(text: string): ReactElement[] {
  return text
    .split("\n")
    .map((paragraph, idx) => <p key={idx}>{paragraph || "\u00A0"}</p>);
}
export function IdeaContent({ idea, isLocked }: IdeaContentProps) {
  if (isLocked) {
    return (
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Premium Content Locked</h3>
        <p className="text-muted-foreground mb-4">
          Purchase this idea to unlock the complete solution and implementation
          guide.
        </p>
      </div>
    );
  }

  const description = formatText(idea.description);
  const problem = formatText(idea.problem);
  const solution = formatText(idea.solution);

  return (
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
  );
}
