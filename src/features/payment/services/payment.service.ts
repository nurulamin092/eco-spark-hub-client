import { apiClient } from "@/lib/api/base";
import {
  CheckoutResponse,
  PaymentsResponse,
  VerifyAccessResponse,
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
};
