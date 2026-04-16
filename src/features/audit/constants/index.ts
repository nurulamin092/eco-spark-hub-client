export const AUDIT_ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  BULK_APPROVE: "BULK_APPROVE",
  BULK_REJECT: "BULK_REJECT",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
} as const;

export const AUDIT_ENTITIES = {
  IDEA: "IDEA",
  COMMENT: "COMMENT",
  USER: "USER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
  CATEGORY: "CATEGORY",
  PAYMENT: "PAYMENT",
} as const;

export const ACTION_COLORS: Record<string, string> = {
  CREATE: "text-green-500 bg-green-500/10",
  UPDATE: "text-blue-500 bg-blue-500/10",
  DELETE: "text-red-500 bg-red-500/10",
  BULK_APPROVE: "text-emerald-500 bg-emerald-500/10",
  BULK_REJECT: "text-orange-500 bg-orange-500/10",
  LOGIN: "text-cyan-500 bg-cyan-500/10",
  LOGOUT: "text-gray-500 bg-gray-500/10",
  REGISTER: "text-purple-500 bg-purple-500/10",
};

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
