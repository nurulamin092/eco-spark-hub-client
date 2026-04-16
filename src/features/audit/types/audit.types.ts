export interface AuditLog {
  id: string;
  userId: string | null;
  userEmail: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  oldValue: unknown | null;
  newValue: unknown | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface AuditLogsResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: AuditLog[];
  };
}

export interface AuditFilters {
  page?: number;
  limit?: number;
  userId?: string;
  entity?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
}

export type ActionType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "BULK_APPROVE"
  | "BULK_REJECT"
  | "LOGIN"
  | "LOGOUT"
  | "REGISTER";

export type EntityType =
  | "IDEA"
  | "COMMENT"
  | "USER"
  | "ADMIN"
  | "MEMBER"
  | "CATEGORY"
  | "PAYMENT";
