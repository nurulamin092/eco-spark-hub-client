import { apiClient } from "@/lib/api/base";
import {
  CheckoutResponse,
  PaymentsResponse,
  VerifyAccessResponse,
  PaymentStatusResponse,
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
};
