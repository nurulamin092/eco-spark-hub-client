/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  icon: string | null;
  description: string | null;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio: string | null;
}

export interface Idea {
  id: string;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  description: string;
  images: any[] | null;
  attachments: any[] | null;
  viewCount: number;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  bookmarkCount: number;
  shareCount: number;
  isPaid: boolean;
  price: number | null;
  status: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  isFeatured: boolean;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author: Author;
  category: Category;
  isLocked?: boolean;
}

export interface CreateIdeaPayload {
  title: string;
  problem: string;
  solution: string;
  description: string;
  categoryId: string;
  isPaid?: boolean;
  price?: number;
}

export interface UpdateIdeaPayload extends Partial<CreateIdeaPayload> {
  status?: "DRAFT" | "UNDER_REVIEW";
}

export interface IdeasResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Idea[];
  };
}

export interface IdeaFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isPaid?: boolean;
  sort?: "recent" | "top" | "commented" | "trending";
  status?: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
}
