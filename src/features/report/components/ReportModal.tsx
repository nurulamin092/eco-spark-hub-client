"use client";

import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Flag } from "lucide-react";
import { useCreateReport } from "../hooks/useCreateReport";
import {
  createReportSchema,
  CreateReportFormValues,
} from "../schemas/report.schema";
import { REPORT_REASONS } from "../constants";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "IDEA" | "COMMENT";
  targetId: string;
}

export function ReportModal({
  isOpen,
  onClose,
  type,
  targetId,
}: ReportModalProps) {
  const { mutateAsync, isPending } = useCreateReport();

  const form = useForm({
    defaultValues: {
      type,
      [type === "IDEA" ? "ideaId" : "commentId"]: targetId,
      reason: "",
      details: "",
    } as CreateReportFormValues,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      onClose();
    },
    validators: {
      onChange: ({ value }) =>
        createReportSchema.safeParse(value).success
          ? undefined
          : { form: "Invalid form data" },
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-destructive" />
            <DialogTitle>
              Report {type === "IDEA" ? "Idea" : "Comment"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Help us keep the community safe by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="reason">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v)}
                >
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_REASONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors.map((e) => (
                  <p key={e} className="text-sm text-destructive">
                    {e}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="details">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="details">Additional Details (Optional)</Label>
                <Textarea
                  id="details"
                  placeholder="Provide more context..."
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isPending}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
