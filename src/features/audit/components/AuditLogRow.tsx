"use client";

import { Badge } from "@/components/ui/badge";
import { AuditLog } from "../types/audit.types";
import { ACTION_COLORS } from "../constants";

interface AuditLogRowProps {
  log: AuditLog;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString();
}

export function AuditLogRow({ log }: AuditLogRowProps) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="w-24 shrink-0">
        <Badge
          className={
            ACTION_COLORS[log.action] || "bg-gray-500/10 text-gray-500"
          }
        >
          {log.action}
        </Badge>
      </div>

      <div className="w-32 shrink-0">
        <span className="text-sm font-mono text-muted-foreground">
          {log.entity}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">
          <span className="font-medium">{log.userEmail || "System"}</span>
          <span className="text-muted-foreground ml-1">
            {log.action === "CREATE" && "created"}
            {log.action === "UPDATE" && "updated"}
            {log.action === "DELETE" && "deleted"}
          </span>
          <span className="font-mono text-muted-foreground ml-1">
            {log.entityId ? `#${log.entityId.slice(0, 8)}` : ""}
          </span>
        </p>
        {log.ipAddress && (
          <p className="text-xs text-muted-foreground mt-1">
            IP: {log.ipAddress} •{" "}
            {log.userAgent?.split(" ").slice(0, 2).join(" ")}
          </p>
        )}
      </div>

      <div className="w-40 shrink-0 text-right">
        <span className="text-xs text-muted-foreground">
          {formatDate(log.createdAt)}
        </span>
      </div>
    </div>
  );
}
