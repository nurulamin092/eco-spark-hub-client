export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  isCurrent?: boolean;
}

export interface SessionsResponse {
  success: boolean;
  message: string;
  data: {
    sessions: Session[];
    currentSessionId: string;
  };
}

export interface RevokeSessionResponse {
  success: boolean;
  message: string;
}

export interface RevokeAllSessionsResponse {
  success: boolean;
  message: string;
}
