export type ReportType = "IDEA" | "COMMENT";
export type ReportStatus =
  | "PENDING"
  | "REVIEWED"
  | "DISMISSED"
  | "ACTION_TAKEN";

export interface Report {
  id: string;
  reporterId: string;
  ideaId: string | null;
  commentId: string | null;
  type: ReportType;
  reason: string;
  description: string | null;
  status: ReportStatus;
  resolvedAt: string | null;
  resolvedBy: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  reporter: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  idea?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  comment?: {
    id: string;
    content: string;
  } | null;
}

export interface CreateReportPayload {
  type: ReportType;
  ideaId?: string;
  commentId?: string;
  reason: string;
  details?: string;
}

export interface ReportsResponse {
  success: boolean;
  message: string;
  data: Report[];
}

export interface ReportResponse {
  success: boolean;
  message: string;
  data: Report;
}

export interface UpdateReportStatusPayload {
  status: ReportStatus;
  notes?: string;
}
