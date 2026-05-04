// src/features/admin/types/members.types.ts

export enum MemberStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export enum MemberRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  MEMBER = "MEMBER",
}

export interface Member {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  profilePhoto: string | null;
  contactNumber: string | null;
  address: string | null;
  bio: string | null;
  user: {
    id: string;
    email: string;
    role: MemberRole;
    status: MemberStatus;
    emailVerified: boolean;
    needPasswordChange: boolean;
    createdAt: string;
    updatedAt: string;
  };
  stats?: MemberStats;
  recentIdeas?: RecentIdea[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface MemberStats {
  totalIdeas: number;
  totalVotes: number;
  totalComments: number;
  totalPayments: number;
}

export interface RecentIdea {
  id: string;
  title: string;
  status: string;
  upvoteCount: number;
  viewCount: number;
  createdAt: string;
}

export interface MembersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: MemberStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface MembersResponse {
  data: Member[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface UpdateMemberPayload {
  name?: string;
  email?: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  bio?: string;
  status?: MemberStatus;
}

export interface BulkActionPayload {
  ids: string[];
  action: "activate" | "deactivate" | "delete";
}

export interface PaginatedMembers {
  data: Member[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
