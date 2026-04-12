/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: 0 },
  },
});

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
    sessions: ["auth", "sessions"] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
  },

  ideas: {
    all: ["ideas"] as const,
    list: (filters?: any) => ["ideas", "list", filters] as const,
    detail: (id: string) => ["ideas", "detail", id] as const,
    myIdeas: (params?: any) => ["ideas", "my-ideas", params] as const,
    testimonials: (limit?: number) => ["ideas", "testimonials", limit] as const,
    featured: (limit?: number) => ["ideas", "featured", limit] as const,
  },

  votes: {
    userVote: (ideaId: string) => ["votes", "user", ideaId] as const,
    myVotes: (params?: any) => ["votes", "my-votes", params] as const,
  },
  comments: {
    byIdea: (ideaId: string) => ["comments", "by-idea", ideaId] as const,
  },
  categories: {
    all: ["categories", "all"] as const,
  },
  payments: {
    myPayments: ["payments", "my-payments"] as const,
    verifyAccess: (ideaId: string) => ["payments", "verify", ideaId] as const,
  },
  newsletter: {
    subscribe: ["newsletter", "subscribe"] as const,
  },
};
