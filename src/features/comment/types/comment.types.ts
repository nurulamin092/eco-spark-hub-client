// ============ src/features/comment/types/comment.types.ts ============
export interface CommentAuthor {
  id: string;
  name: string;
  email?: string;
  image: string | null;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  ideaId: string;
  parentId: string | null;
  path: string;
  depth: number;
  isDeleted: boolean;
  isEdited: boolean;
  editCount: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  user: CommentAuthor;
  replies?: Comment[];
}

export interface CreateCommentPayload {
  content: string;
  ideaId: string;
  parentId?: string;
}

export interface UpdateCommentPayload {
  content: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: unknown;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
