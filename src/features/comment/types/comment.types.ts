export interface CommentAuthor {
  id: string;
  name: string;
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

export interface CommentsResponse {
  success: boolean;
  message: string;
  data: Comment[];
}

export interface CommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface DeleteCommentResponse {
  success: boolean;
  message: string;
}
