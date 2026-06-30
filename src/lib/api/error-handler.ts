import { AxiosError } from "axios";

export interface ApiError {
  statusCode: number;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}


export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status ?? 500;
    const serverMessage = error.response?.data?.message;

    switch (statusCode) {
      case 400:
        return {
          statusCode,
          message: serverMessage || "Invalid request. Please check your input.",
          code: "BAD_REQUEST",
        };
      case 401:
        return {
          statusCode,
          message: "Your session has expired. Please login again.",
          code: "UNAUTHORIZED",
        };
      case 403:
        return {
          statusCode,
          message: "You don't have permission to perform this action.",
          code: "FORBIDDEN",
        };
      case 404:
        return {
          statusCode,
          message: "The requested resource was not found.",
          code: "NOT_FOUND",
        };
      case 429:
        return {
          statusCode,
          message: "Too many requests. Please try again later.",
          code: "RATE_LIMITED",
        };
      case 500:
        return {
          statusCode,
          message: "Something went wrong on our end. Please try again later.",
          code: "INTERNAL_SERVER_ERROR",
        };
      default:
        return {
          statusCode,
          message: serverMessage || "An unexpected error occurred.",
          code: "UNKNOWN_ERROR",
        };
    }
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message,
      code: "CLIENT_ERROR",
    };
  }

  return {
    statusCode: 500,
    message: "An unknown error occurred.",
    code: "UNKNOWN",
  };
}
