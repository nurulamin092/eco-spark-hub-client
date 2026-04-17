"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsletterService } from "@/features/newsletter/services/newsletter.service";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminNewsletterPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.newsletter.subscribers({
      page,
      limit,
      search,
    }),
    queryFn: async () => {
      const response = await newsletterService.getSubscribers({
        page,
        limit,
        isActive: true,
        ...(search && { search }),
      });
      return response.data;
    },
  });

  const handleExport = () => {
    toast.info("Export feature coming soon");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const { data: subscribers, meta } = data || {
    data: [],
    meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">Manage your email subscribers</p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium">
              <div className="col-span-6">Email</div>
              <div className="col-span-3">Subscribed On</div>
              <div className="col-span-3">Status</div>
            </div>
            <div className="divide-y">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="grid grid-cols-12 gap-4 p-4"
                >
                  <div className="col-span-6 truncate">{subscriber.email}</div>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </div>
                  <div className="col-span-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page >= meta.totalPages}
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
