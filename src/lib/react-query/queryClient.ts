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
  auth: { me: ["auth", "me"] as const },
  ideas: {
    all: ["ideas"] as const,
    list: (filters?: any) => ["ideas", "list", filters] as const,
    detail: (id: string) => ["ideas", "detail", id] as const,
    featured: (limit?: number) => ["ideas", "featured", limit] as const,
    testimonials: (limit?: number) => ["ideas", "testimonials", limit] as const,
  },
  categories: { all: ["categories", "all"] as const },
};
