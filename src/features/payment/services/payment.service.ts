/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api/base";
import {
  CheckoutResponse,
  PaymentsResponse,
  VerifyAccessResponse,
  PaymentStatusResponse,
  AdminPaymentsResponse,
} from "../types/payment.types";

export const paymentService = {
  createCheckout: async (ideaId: string): Promise<CheckoutResponse> => {
    const response = await apiClient.post("/payments/checkout", { ideaId });
    return response.data;
  },

  getMyPayments: async (): Promise<PaymentsResponse> => {
    const response = await apiClient.get("/payments/me");
    return response.data;
  },

  verifyAccess: async (ideaId: string): Promise<VerifyAccessResponse> => {
    const response = await apiClient.get(`/payments/verify/${ideaId}`);
    return response.data;
  },
  getPaymentStatus: async (ideaId: string): Promise<PaymentStatusResponse> => {
    const response = await apiClient.get(`/payments/status/${ideaId}`);
    return response.data;
  },
    getAllPaymentsForAdmin: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<AdminPaymentsResponse> => {
    const response = await apiClient.get("/payments/admin/all", { params });
    return response.data;
  },

  approvePayment: async (paymentId: string): Promise<any> => {
    const response = await apiClient.patch(`/payments/admin/${paymentId}/approve`);
    return response.data;
  },

  rejectPayment: async (paymentId: string, reason: string): Promise<any> => {
    const response = await apiClient.patch(`/payments/admin/${paymentId}/reject`, {
      reason,
    });
    return response.data;
  },
};
