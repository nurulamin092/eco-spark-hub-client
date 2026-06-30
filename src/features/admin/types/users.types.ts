export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MEMBER";
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  member?: {
    id: string;
    name: string;
    email: string;
  } | null;
  admin?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole | "ALL";
  status?: UserStatus | "ALL";
  sortBy?: "createdAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedUsers {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpdateUserRolePayload {
  role: UserRole;
}

export interface UpdateUserRoleResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface BulkUserActionResponse {
  success: boolean;
  message: string;
  count: number;
}
