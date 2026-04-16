export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface BlogAuthor {
  id: string;
  name: string;
  image: string | null;
  bio?: string | null;
}

export interface BlogCategory {
  id: string;
  name: string;
  color: string | null;
  icon: string | null;
  description?: string | null;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  images: unknown[] | null;
  videoUrl: string | null;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  readTime: number | null;
  status: BlogStatus;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: BlogAuthor;
  category: BlogCategory | null;
  tags: BlogTag[];
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  images?: unknown[];
  videoUrl?: string;
  categoryId?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateBlogPayload extends Partial<CreateBlogPayload> {
  status?: BlogStatus;
  isFeatured?: boolean;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: BlogStatus;
  sort?: "recent" | "popular" | "trending";
}

export interface BlogsResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Blog[];
  };
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

export interface BlogComment {
  id: string;
  content: string;
  blogId: string;
  userId: string;
  parentId: string | null;
  likeCount: number;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  replies?: BlogComment[];
}

export interface CommentsResponse {
  success: boolean;
  message: string;
  data: BlogComment[];
}

export interface CreateCommentPayload {
  content: string;
  blogId: string;
  parentId?: string;
}
