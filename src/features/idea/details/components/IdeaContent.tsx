"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Idea } from "../../shared/types/idea.types";

interface IdeaContentProps {
  idea: Idea;
  isLocked?: boolean;
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

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="problem">Problem</TabsTrigger>
        <TabsTrigger value="solution">Solution</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4 space-y-4">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {idea.description.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="problem" className="mt-4 space-y-4">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h3>The Problem We&lsquo;re Solving</h3>
          {idea.problem.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="solution" className="mt-4 space-y-4">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h3>Our Proposed Solution</h3>
          {idea.solution.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
