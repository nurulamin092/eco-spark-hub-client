import { toast } from "sonner";

export type ErrorType =
  | "NETWORK"
  | "AUTH"
  | "VALIDATION"
  | "SERVER"
  | "UNKNOWN";

export interface AppError {
  type: ErrorType;
  message: string;
  statusCode?: number;
  originalError?: unknown;
}

export function handleError(error: unknown): AppError {
  if (error instanceof Error) {
    if (
      error.message.includes("Network Error") ||
      error.message.includes("fetch")
    ) {
      return {
        type: "NETWORK",
        message: "Network connection error. Please check your internet.",
      };
    }
    if (error.message.includes("401")) {
      return {
        type: "AUTH",
        message: "Session expired. Please login again.",
        statusCode: 401,
      };
    }
    if (error.message.includes("403")) {
      return {
        type: "AUTH",
        message: "You don't have permission.",
        statusCode: 403,
      };
    }
    if (error.message.includes("404")) {
      return {
        type: "SERVER",
        message: "Resource not found.",
        statusCode: 404,
      };
    }
    if (error.message.includes("429")) {
      return {
        type: "NETWORK",
        message: "Too many requests. Please wait a moment.",
      };
    }
    if (error.message.includes("500")) {
      return {
        type: "SERVER",
        message: "Server error. Please try again later.",
        statusCode: 500,
      };
    }
    return {
      type: "UNKNOWN",
      message: error.message || "An unexpected error occurred",
    };
  }
  return { type: "UNKNOWN", message: "An unexpected error occurred" };
}

export function showErrorToast(error: unknown) {
  const appError = handleError(error);
  toast.error(appError.message);
}

export function formatApiError(error: unknown): string {
  const appError = handleError(error);
  return appError.message;
}
