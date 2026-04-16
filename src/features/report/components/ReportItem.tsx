"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Report, ReportStatus } from "../types/report.types";
import { REPORT_STATUS, REPORT_TYPES } from "../constants";
import { useUpdateReportStatus } from "../hooks/useUpdateReportStatus";

interface ReportItemProps {
  report: Report;
  onUpdate: () => void;
}

export function ReportItem({ report, onUpdate }: ReportItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ReportStatus>(report.status);
  const [notes, setNotes] = useState("");
  const { mutateAsync, isPending } = useUpdateReportStatus();

  const handleUpdate = async () => {
    await mutateAsync({
      reportId: report.id,
      payload: { status, notes: notes || undefined },
    });
    setIsOpen(false);
    onUpdate();
  };

  const statusInfo = REPORT_STATUS[report.status];
  const typeInfo = REPORT_TYPES[report.type];

  return (
    <>
      <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/30">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusInfo.bgColor + " " + statusInfo.color}>
              {statusInfo.label}
            </Badge>
            <Badge variant="outline">{typeInfo.label}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="font-medium">{report.reason}</p>
          {report.description && (
            <p className="text-sm text-muted-foreground">
              {report.description}
            </p>
          )}
          <div className="text-xs text-muted-foreground">
            Reported by: {report.reporter.name}
          </div>
          {report.idea && (
            <div className="text-xs">Target Idea: {report.idea.title}</div>
          )}
          {report.comment && (
            <div className="text-xs">
              Target Comment: {report.comment.content.slice(0, 100)}
            </div>
          )}
        </div>
        {report.status === "PENDING" && (
          <Button size="sm" onClick={() => setIsOpen(true)}>
            Review
          </Button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Reason</Label>
              <p className="text-sm">{report.reason}</p>
            </div>
            {report.description && (
              <div>
                <Label>Details</Label>
                <p className="text-sm">{report.description}</p>
              </div>
            )}
            <div>
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as ReportStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REVIEWED">Reviewed</SelectItem>
                  <SelectItem value="DISMISSED">Dismissed</SelectItem>
                  <SelectItem value="ACTION_TAKEN">Action Taken</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add resolution notes..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isPending}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
