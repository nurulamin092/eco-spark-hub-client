import { Metadata } from "next";
import { requireAuth } from "@/lib/api/auth.guard";
import CreateIdeaForm from "@/features/idea/create/components/CreateIdeaForm";

export const metadata: Metadata = {
  title: "Create Idea | EcoSpark Hub",
  description: "Share your sustainability idea with the community",
};

export default async function CreateIdeaPage() {
  await requireAuth();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <CreateIdeaForm />
    </div>
  );
}
