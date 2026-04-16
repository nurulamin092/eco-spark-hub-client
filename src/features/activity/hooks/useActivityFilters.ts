"use client";

import { useState, useCallback } from "react";
import { ActivityFilters, ActivityType } from "../types/activity.types";

const initialState: ActivityFilters = {
  page: 1,
  limit: 20,
  type: undefined,
  userId: "",
};

export function useActivityFilters() {
  const [filters, setFilters] = useState<ActivityFilters>(initialState);

  const updateFilter = useCallback(
    (
      key: keyof ActivityFilters,
      value: string | number | ActivityType | undefined,
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: key === "page" ? (value as number) : 1,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, []);

  return { filters, updateFilter, resetFilters };
}
