import { BlogDetails } from "@/features/blog/components/BlogDetails";
import { blogService } from "@/features/blog/services/blog.service";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  try {
    const response = await blogService.getBySlug(slug);
    const blog = response.data;
    return {
      title: blog.metaTitle || blog.title,
      description:
        blog.metaDescription || blog.excerpt || blog.content.slice(0, 160),
    };
  } catch {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found",
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
}
