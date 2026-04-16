"use client";

import { useState, useCallback } from "react";
import { AuditFilters } from "../types/audit.types";

const initialState: AuditFilters = {
  page: 1,
  limit: 20,
  userId: "",
  entity: "",
  action: "",
  startDate: "",
  endDate: "",
};

export function useAuditFilters() {
  const [filters, setFilters] = useState<AuditFilters>(initialState);

  const updateFilter = useCallback(
    (key: keyof AuditFilters, value: string | number) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: key === "page" ? (value as number) : prev.page,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, []);

  return { filters, updateFilter, resetFilters };
}