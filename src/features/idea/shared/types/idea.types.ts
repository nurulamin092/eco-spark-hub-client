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
  images: unknown[] | null;
  attachments: unknown[] | null;
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

export interface CreateIdeaResponse {
  success: boolean;
  message: string;
  data: Idea;
}

export interface UpdateIdeaPayload {
  title?: string;
  problem?: string;
  solution?: string;
  description?: string;
  categoryId?: string;
  isPaid?: boolean;
  price?: number | null;
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
  sort?: "recent" | "top" | "commented" | "trending" | "popular" | "oldest";
  status?: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
}

export interface MyIdeasFilters {
  page?: number;
  limit?: number;
  status?: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  search?: string;
}

export interface IdeaFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;   
  status?: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  sort?: "recent" | "top" | "popular" | "commented" | "trending" | "oldest";
}
export interface MyIdeasResponse {
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

export interface DeleteIdeaResponse {
  success: boolean;
  message: string;
}

export interface SubmitIdeaResponse {
  success: boolean;
  message: string;
  data: Idea;
}

export interface EditIdeaPayload {
  title?: string;
  problem?: string;
  solution?: string;
  description?: string;
  categoryId?: string;
  isPaid?: boolean;
  price?: number | null;
}

export interface EditIdeaResponse {
  success: boolean;
  message: string;
  data: Idea;
}

export interface RelatedIdea {
  id: string;
  title: string;
  slug: string;
  upvoteCount: number;
  author: {
    name: string;
    image: string | null;
  };
}

export interface IdeaForEditResponse {
  success: boolean;
  message: string;
  data: Idea;
}
