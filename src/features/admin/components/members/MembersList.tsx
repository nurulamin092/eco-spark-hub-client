/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, RotateCcw, Users, Loader2 } from "lucide-react";
import { MembersRow } from "./MembersRow";
import { useMembers } from "../../hooks/queries/useMembers";
import { MemberStatus } from "../../types/members.types";
import { MemberBulkActions } from "./MemberBulkActions";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "DELETED", label: "Deleted" },
];

const SORT_OPTIONS = [
  { value: "createdAt", label: "Created Date" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
];

export function MembersList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    search: string;
    status?: MemberStatus;
    sortBy: "createdAt" | "name" | "email";
    sortOrder: "asc" | "desc";
  }>({
    page: Number(searchParams.get("page")) || 1,
    limit: 20,
    search: searchParams.get("search") || "",
    status: (searchParams.get("status") as MemberStatus) || undefined,
    sortBy:
      (searchParams.get("sortBy") as "createdAt" | "name" | "email") ||
      "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data, isLoading, error, refetch, isFetching } = useMembers(filters);

  const handleFilterChange = useCallback(
    (key: string, value: any) => {
      setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
      const params = new URLSearchParams();
      if (value) params.set(key, String(value));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!data?.data) return;
    if (selectedIds.length === data.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.data.map((m) => m.id));
    }
  }, [selectedIds, data]);

  const handleReset = useCallback(() => {
    setFilters({
      page: 1,
      limit: 20,
      search: "",
      status: undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    router.replace("/admin/members", { scroll: false });
  }, [router]);

  const { data: members, meta } = data || {
    data: [],
    meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
  };

  const isLoadingFirstPage = isLoading && filters.page === 1;

  if (isLoadingFirstPage) {
    return <MembersListSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load members. Please try again later.
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="mt-2"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Members</h2>
          <p className="text-muted-foreground">
            Manage all registered users of the platform
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RotateCcw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={filters.status || "ALL"}
          onValueChange={(v) =>
            handleFilterChange("status", v === "ALL" ? undefined : v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.sortBy}
          onValueChange={(v) => handleFilterChange("sortBy", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.sortOrder}
          onValueChange={(v) => handleFilterChange("sortOrder", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(filters.search || filters.status) && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <MemberBulkActions
          selectedIds={selectedIds}
          onSuccess={() => {
            setSelectedIds([]);
            refetch();
          }}
        />
      )}

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            Members
          </CardTitle>
          <CardDescription>
            Total {meta.total} members • Showing {members.length} on this page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === members.length && members.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-input"
                />
              </div>
              <div className="col-span-4">Member</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Joined</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y">
              {members.map((member) => (
                <MembersRow
                  key={member.id}
                  member={member}
                  isSelected={selectedIds.includes(member.id)}
                  onSelect={(id) => {
                    setSelectedIds((prev) =>
                      prev.includes(id)
                        ? prev.filter((i) => i !== id)
                        : [...prev, id],
                    );
                  }}
                  onUpdate={() => refetch()}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page <= 1 || isFetching}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page >= meta.totalPages || isFetching}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MembersListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
