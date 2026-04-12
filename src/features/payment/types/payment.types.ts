export interface CheckoutSession {
  url: string;
  sessionId: string;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  data: CheckoutSession;
}

export interface Payment {
  id: string;
  userId: string;
  ideaId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  provider: string;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  idea?: {
    id: string;
    title: string;
    slug: string;
    description: string;
  };
}

export interface PaymentsResponse {
  success: boolean;
  message: string;
  data: Payment[];
}

export interface VerifyAccessResponse {
  success: boolean;
  message: string;
  data: {
    hasAccess: boolean;
  };
}
