export interface SubscribePayload {
  email: string;
}

export interface UnsubscribePayload {
  email: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    isActive: boolean;
  };
}

export interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribersResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Subscriber[];
  };
}
