import { IdeaDetails } from "@/features/idea/details/components/IdeaDetails";
import { Metadata } from "next";
import { ideaService } from "@/features/idea/shared/services/idea.service";

interface IdeaPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: IdeaPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await ideaService.getIdeaById(id);
    const idea = response.data;

    return {
      title: `${idea.title} | EcoSpark Hub`,
      description: idea.description.slice(0, 160),
      openGraph: {
        title: idea.title,
        description: idea.description.slice(0, 160),
        type: "article",
        publishedTime: idea.publishedAt || idea.createdAt,
        authors: [idea.author.name],
      },
    };
  } catch {
    return {
      title: "Idea Not Found | EcoSpark Hub",
      description: "The requested idea could not be found",
    };
  }
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const { id } = await params;

  return <IdeaDetails ideaId={id} />;
}
