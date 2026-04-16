"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { blogService } from "../services/blog.service";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "../types/blog.types";

interface RelatedBlogsProps {
  blogId: string;
  categoryId: string | null;
}

export function RelatedBlogs({ blogId }: RelatedBlogsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["related-blogs", blogId],
    queryFn: () => blogService.getRelated(blogId, 3),
    enabled: !!blogId,
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  const response = data?.data;
  const blogs = Array.isArray(response) ? response : [];

  if (blogs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog: Blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              {blog.featuredImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
