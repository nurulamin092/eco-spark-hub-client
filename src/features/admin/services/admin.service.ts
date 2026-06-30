// ============ src/features/admin/services/admin.service.ts ============
import { apiClient } from "@/lib/api/base";
import type {
  FullDashboardData,
  DashboardStats,
  GrowthAnalytics,
  TopIdea,
  PendingIdea,
  RecentReport,
  SystemHealth,
  ApiResponse,
} from "../types/admin.types";

class AdminService {
  private static instance: AdminService;

  private constructor() {}

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  // Dashboard
  async getFullDashboard(): Promise<FullDashboardData> {
    const response =
      await apiClient.get<ApiResponse<FullDashboardData>>("/admin/dashboard");
    return response.data.data;
  }

  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(
      "/admin/dashboard/stats",
    );
    return response.data.data;
  }

  async getGrowthAnalytics(): Promise<GrowthAnalytics> {
    const response = await apiClient.get<ApiResponse<GrowthAnalytics>>(
      "/admin/dashboard/growth",
    );
    return response.data.data;
  }

  async getTopIdeas(limit: number = 10): Promise<TopIdea[]> {
    const response = await apiClient.get<ApiResponse<TopIdea[]>>(
      `/admin/dashboard/top-ideas?limit=${limit}`,
    );
    return response.data.data;
  }

  async getPendingIdeas(limit: number = 10): Promise<PendingIdea[]> {
    const response = await apiClient.get<ApiResponse<PendingIdea[]>>(
      `/admin/dashboard/pending-ideas?limit=${limit}`,
    );
    return response.data.data;
  }

  async getRecentReports(limit: number = 10): Promise<RecentReport[]> {
    const response = await apiClient.get<ApiResponse<RecentReport[]>>(
      `/admin/dashboard/recent-reports?limit=${limit}`,
    );
    return response.data.data;
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const response = await apiClient.get<ApiResponse<SystemHealth>>(
      "/admin/dashboard/system-health",
    );
    return response.data.data;
  }

  // Members

  async exportUsers(format: "csv" | "json" = "csv"): Promise<Blob> {
    const response = await apiClient.get(
      `/admin/export/users?format=${format}`,
      { responseType: "blob" },
    );
    return response.data;
  }

  async exportIdeas(format: "csv" | "json" = "csv"): Promise<Blob> {
    const response = await apiClient.get(
      `/admin/export/ideas?format=${format}`,
      { responseType: "blob" },
    );
    return response.data;
  }
}

export const adminService = AdminService.getInstance();
