/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { Loader2 } from "lucide-react";
import { Setting, SettingType } from "../types/setting.types";
import { SETTING_TYPE_LABELS } from "../constants";
import { useUpdateSetting } from "../hooks/useUpdateSetting";
import {
  updateSettingSchema,
  UpdateSettingFormValues,
} from "../schemas/setting.schema";

interface SettingsFormProps {
  setting: Setting;
  onSuccess: () => void;
  onCancel: () => void;
}

export function SettingsForm({
  setting,
  onSuccess,
  onCancel,
}: SettingsFormProps) {
  const { mutateAsync, isPending } = useUpdateSetting(setting.key);

  const form = useForm({
    defaultValues: {
      value: setting.value,
      description: setting.description || "",
      isPublic: setting.isPublic,
    } as UpdateSettingFormValues,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      onSuccess();
    },
    validators: {
      onChange: ({ value }) =>
        updateSettingSchema.safeParse(value).success
          ? undefined
          : { form: "Invalid" },
    },
  });

  const renderValueInput = (type: SettingType, field: any) => {
    if (type === "BOOLEAN")
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={field.state.value}
            onCheckedChange={(v) => field.handleChange(v)}
          />
          <span className="text-sm">{field.state.value ? "Yes" : "No"}</span>
        </div>
      );
    if (type === "NUMBER")
      return (
        <Input
          type="number"
          value={field.state.value || ""}
          onChange={(e) => field.handleChange(parseFloat(e.target.value))}
          placeholder="Enter number"
        />
      );
    if (type === "JSON")
      return (
        <Textarea
          value={JSON.stringify(field.state.value, null, 2)}
          onChange={(e) => {
            try {
              field.handleChange(JSON.parse(e.target.value));
            } catch {}
          }}
          rows={5}
          className="font-mono text-sm"
        />
      );
    return (
      <Input
        value={field.state.value || ""}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="Enter value"
      />
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="value">
        {(field) => (
          <div className="space-y-2">
            <Label>Value ({SETTING_TYPE_LABELS[setting.type]})</Label>
            {renderValueInput(setting.type, field)}
            {field.state.meta.errors.map((e) => (
              <p key={e} className="text-sm text-destructive">
                {e}
              </p>
            ))}
          </div>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={2}
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
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
