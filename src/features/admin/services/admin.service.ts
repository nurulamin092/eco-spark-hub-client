/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api/base";
import {
  ApiResponse,
  FullDashboardData,
  GrowthAnalytics,
  PendingIdea,
  RecentReport,
  SystemHealth,
  TopIdea,
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
  async getFullDashboard(): Promise<FullDashboardData> {
    const response = await apiClient.get<ApiResponse<any>>("/admin/dashboard");
    // Transform the response to match FullDashboardData structure
    const data = response.data.data;
    return {
      stats: data.stats,
      analytics: data.analytics || { ideas: [], revenue: [] },
      topIdeas: data.topIdeas || [],
      reports: data.recentReports || [],
      pendingIdeas: data.pendingIdeas || [],
      recentActivities: data.recentActivities || [],
      memberGrowth: data.memberGrowth || {
        last7Days: [],
        totalActive: 0,
        totalBlocked: 0,
      },
      categoryStats: data.categoryStats || [],
      systemHealth: data.systemHealth || {
        activeUsers24h: 0,
        newIdeas24h: 0,
        activeSessions: 0,
        timestamp: new Date().toISOString(),
      },
    };
  }

  async getStats() {
    const response = await apiClient.get("/admin/dashboard/stats");
    return response.data.data;
  }
  async getGrowthAnalytics(): Promise<GrowthAnalytics> {
    const response = await apiClient.get<ApiResponse<GrowthAnalytics>>(
      "/admin/dashboard/growth",
    );
    return response.data.data;
  }
  async getPendingIdeas(limit: number = 10): Promise<PendingIdea[]> {
    const response = await apiClient.get<ApiResponse<PendingIdea[]>>(
      `/admin/dashboard/pending-ideas?limit=${limit}`,
    );
    return response.data.data;
  }

  async getTopIdeas(limit: number = 10): Promise<TopIdea[]> {
    const response = await apiClient.get<ApiResponse<TopIdea[]>>(
      `/admin/dashboard/top-ideas?limit=${limit}`,
    );
    return response.data.data;
  }
  async getSystemHealth(): Promise<SystemHealth> {
    const response = await apiClient.get<ApiResponse<SystemHealth>>(
      "/admin/dashboard/system-health",
    );
    return response.data.data;
  }

  async getRecentReports(limit: number = 10): Promise<RecentReport[]> {
    const response = await apiClient.get<ApiResponse<RecentReport[]>>(
      `/admin/dashboard/recent-reports?limit=${limit}`,
    );
    return response.data.data;
  }
}

export const adminService = AdminService.getInstance();
