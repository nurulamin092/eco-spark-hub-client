"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Eye,
  Heart,
  Clock,
  Share2,
  User,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useBlogDetails } from "../hooks/useBlogDetails";
import { useBlogLike } from "../hooks/useBlogLike";
import { BlogComment } from "./BlogComment";
import { BlogCommentForm } from "./BlogCommentForm";
import { RelatedBlogs } from "./RelatedBlogs";
import { BLOG_STATUS_COLORS, BLOG_STATUS_LABELS } from "../constants";

interface BlogDetailsProps {
  slug: string;
}

export function BlogDetails({ slug }: BlogDetailsProps) {
  const { data: blog, isLoading, error } = useBlogDetails(slug);
  const { mutateAsync: toggleLike, isPending: isLiking } = useBlogLike(
    blog?.id || "",
  );

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt || undefined,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  }, [blog]);

  const handleLike = useCallback(async () => {
    if (!blog) return;
    await toggleLike();
  }, [blog, toggleLike]);

  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  if (error || !blog) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load blog post. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const statusColor =
    BLOG_STATUS_COLORS[blog.status] || BLOG_STATUS_COLORS.DRAFT;
  const timeAgo = formatDistanceToNow(
    new Date(blog.publishedAt || blog.createdAt),
    { addSuffix: true },
  );

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className={statusColor}>
            {BLOG_STATUS_LABELS[blog.status]}
          </Badge>
          {blog.category && (
            <Badge variant="outline" className="bg-primary/5">
              {blog.category.name}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={blog.author.image || ""} />
              <AvatarFallback>{blog.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">
              {blog.author.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {timeAgo}
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readTime} min read
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {blog.viewCount} views
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
        {blog.content.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Tags */}
      {blog.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-8 pt-4 border-t">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {blog.tags.map((tag) => (
            <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
              <Badge
                variant="secondary"
                className="hover:bg-primary/20 transition-colors"
              >
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 py-6 border-y mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLike}
          disabled={isLiking}
          className="gap-2"
        >
          <Heart
            className={`h-4 w-4 ${blog.likeCount > 0 ? "fill-red-500 text-red-500" : ""}`}
          />
          {blog.likeCount} Likes
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Author Bio */}
      {blog.author.bio && (
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blog.author.image || ""} />
              <AvatarFallback>{blog.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                {blog.author.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {blog.author.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <BlogCommentForm blogId={blog.id} />
        <BlogComment blogId={blog.id} />
      </div>

      {/* Related Blogs */}
      <div className="mt-12 pt-8 border-t">
        <RelatedBlogs blogId={blog.id} categoryId={blog.category?.id || null} />
      </div>
    </article>
  );
}

function BlogDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-96 w-full rounded-lg" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
