import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PendingIdeasFilters {
  page: number;
  limit: number;
  search: string;
  category: string;
  sortBy: "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
}

interface AdminFiltersStore {
  pendingIdeasFilters: PendingIdeasFilters;
  setPendingIdeasFilters: (filters: Partial<PendingIdeasFilters>) => void;
  resetPendingIdeasFilters: () => void;
}

const defaultPendingIdeasFilters: PendingIdeasFilters = {
  page: 1,
  limit: 10,
  search: "",
  category: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useAdminFiltersStore = create<AdminFiltersStore>()(
  persist(
    (set) => ({
      pendingIdeasFilters: defaultPendingIdeasFilters,
      setPendingIdeasFilters: (filters) =>
        set((state) => ({
          pendingIdeasFilters: { ...state.pendingIdeasFilters, ...filters },
        })),
      resetPendingIdeasFilters: () =>
        set({ pendingIdeasFilters: defaultPendingIdeasFilters }),
    }),
    {
      name: "admin-filters-storage",
    },
  ),
);
