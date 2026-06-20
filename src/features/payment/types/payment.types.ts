export interface CheckoutSession {
  url: string;
  sessionId: string;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  data: CheckoutSession;
}
export interface PaymentIdea {
  id: string;
  title: string;
  slug: string;
  description: string;
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
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  paymentMethod?: string | null;
  accessExpiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
  idea?: PaymentIdea;
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

export interface PaymentStatusResponse {
  success: boolean;
  message: string;
  data: Payment | null;
}

export interface AdminPayment extends Payment {
  user: {
    id: string;
    name: string;
    email: string;
  };
  idea: {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
  };
}

export interface AdminPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: AdminPayment[];
  };
}
