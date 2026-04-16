"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart, Clock } from "lucide-react";
import { Blog } from "../types/blog.types";
import { BLOG_STATUS_COLORS, BLOG_STATUS_LABELS } from "../constants";

interface BlogCardProps {
  blog: Blog;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ blog }: BlogCardProps) {
  const statusColor =
    BLOG_STATUS_COLORS[blog.status] || BLOG_STATUS_COLORS.DRAFT;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
      {blog.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className={statusColor}>
            {BLOG_STATUS_LABELS[blog.status]}
          </Badge>
          {blog.category && (
            <span className="text-xs text-muted-foreground">
              {blog.category.name}
            </span>
          )}
        </div>
        <Link href={`/blog/${blog.slug}`}>
          <CardTitle className="hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {blog.excerpt || blog.content.slice(0, 150)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 border-t pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {blog.viewCount}
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {blog.likeCount}
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readTime} min read
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 w-full">
          <Avatar className="h-6 w-6">
            <AvatarImage src={blog.author.image || ""} />
            <AvatarFallback>{blog.author.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{blog.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(blog.publishedAt || blog.createdAt)}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
