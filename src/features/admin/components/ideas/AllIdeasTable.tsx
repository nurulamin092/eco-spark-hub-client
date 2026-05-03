"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye, Check, X, Search } from "lucide-react";
import Link from "next/link";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { useAdminIdeas } from "../../hooks/useAdminIdeas";
import { useApproveIdea } from "../../hooks/mutations/useApproveIdea";
import { useRejectIdea } from "../../hooks/mutations/useRejectIdea";

import type { AdminIdeasFilters } from "../../types/admin.types";

const STATUS_MAP = {
  DRAFT: "Draft",
  UNDER_REVIEW: "Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
} as const;

export function AllIdeasTable() {
  const params = useSearchParams();

  const [page, setPage] = useState(Number(params.get("page") ?? 1));
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [status, setStatus] = useState<AdminIdeasFilters["status"]>();

  const debouncedSearch = useDebounce(search);

  const filters = useMemo<AdminIdeasFilters>(
    () => ({
      page,
      limit: 10,
      search: debouncedSearch || undefined,
      status,
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    [page, debouncedSearch, status],
  );

  const { data, isLoading } = useAdminIdeas(filters);

  const approveMutation = useApproveIdea();
  const rejectMutation = useRejectIdea();

  const ideas = useMemo(() => data?.data ?? [], [data]);
  const meta = data?.meta;

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const isAllSelected = ideas.length > 0 && selected.size === ideas.length;

  const selectAll = useCallback(() => {
    if (isAllSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(ideas.map((i) => i.id)));
    }
  }, [ideas, isAllSelected]);

  const clear = useCallback(() => {
    setSelected(new Set());
  }, []);

  if (isLoading) {
    return <div className="p-4 text-sm">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            placeholder="Search ideas..."
          />
        </div>

        <Select
          value={status ?? "ALL"}
          onValueChange={(v) =>
            setStatus(
              v === "ALL" ? undefined : (v as AdminIdeasFilters["status"]),
            )
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="UNDER_REVIEW">Review</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions (UI only for now) */}
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={selectAll}>
          {isAllSelected ? "Deselect All" : "Select All"}
        </Button>

        {selected.size > 0 && (
          <>
            <Button variant="outline" onClick={clear}>
              Clear
            </Button>

            {/* You can wire bulk approve later */}
            <Button disabled>Bulk Approve ({selected.size})</Button>
          </>
        )}
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Upvotes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea.id}>
              <TableCell>
                <Checkbox
                  checked={selected.has(idea.id)}
                  onCheckedChange={() => toggleSelect(idea.id)}
                />
              </TableCell>

              <TableCell>{idea.title}</TableCell>

              <TableCell>
                <Badge>{STATUS_MAP[idea.status]}</Badge>
              </TableCell>

              <TableCell>{idea.upvoteCount}</TableCell>

              <TableCell className="text-right flex gap-2 justify-end">
                <Link href={`/admin/ideas/${idea.id}`}>
                  <Button size="sm">
                    <Eye />
                  </Button>
                </Link>

                {/* APPROVE */}
                <Button
                  size="sm"
                  disabled={approveMutation.isPending}
                  onClick={() => approveMutation.mutate(idea.id)}
                >
                  <Check />
                </Button>

                {/* REJECT */}
                <Button
                  size="sm"
                  disabled={rejectMutation.isPending}
                  onClick={() => {
                    const feedback = prompt("Enter rejection feedback");

                    if (!feedback || feedback.trim().length === 0) {
                      return;
                    }

                    rejectMutation.mutate({
                      ideaId: idea.id,
                      feedback,
                    });
                  }}
                >
                  <X />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center gap-2">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Prev
          </Button>

          <span>
            {page} / {meta.totalPages}
          </span>

          <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
