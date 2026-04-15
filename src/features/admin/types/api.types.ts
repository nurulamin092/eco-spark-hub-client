export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: T[];
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: {
    code: string;
    details?: unknown;
  };
}
