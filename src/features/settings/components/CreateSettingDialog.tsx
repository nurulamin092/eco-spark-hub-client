/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCreateSetting } from "../hooks/useCreateSetting";
import {
  createSettingSchema,
  CreateSettingFormValues,
} from "../schemas/setting.schema";
import { SETTING_TYPES, SETTING_TYPE_LABELS } from "../constants";

interface CreateSettingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateSettingDialog({
  isOpen,
  onClose,
  onSuccess,
}: CreateSettingDialogProps) {
  const { mutateAsync, isPending } = useCreateSetting();

  const form = useForm({
    defaultValues: {
      key: "",
      value: "",
      type: "STRING",
      description: "",
      isPublic: false,
    } as CreateSettingFormValues,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      onSuccess();
      onClose();
    },
    validators: {
      onChange: ({ value }) =>
        createSettingSchema.safeParse(value).success
          ? undefined
          : { form: "Invalid" },
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Setting</DialogTitle>
          <DialogDescription>Add a new configuration setting</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="key">
            {(field) => (
              <div className="space-y-2">
                <Label>Key</Label>
                <Input
                  placeholder="site_name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="type">
            {(field) => (
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SETTING_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {SETTING_TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
          <form.Field name="value">
            {(field) => (
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  placeholder="Enter value"
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Optional description"
                />
              </div>
            )}
          </form.Field>
          <form.Field name="isPublic">
            {(field) => (
              <div className="flex items-center justify-between">
                <Label>Public</Label>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(v)}
                />
              </div>
            )}
          </form.Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
