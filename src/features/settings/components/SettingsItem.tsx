"use client";

import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Setting, SettingType } from "../types/setting.types";
import { SETTING_TYPE_LABELS } from "../constants";
import { SettingsForm } from "./SettingsForm";
import { useDeleteSetting } from "../hooks/useDeleteSetting";

interface SettingsItemProps {
  setting: Setting;
  onUpdate: () => void;
}

function formatValue(value: unknown, type: SettingType): string {
  if (value === null || value === undefined) return "-";
  if (type === "BOOLEAN") return value ? "Yes" : "No";
  if (type === "JSON") return JSON.stringify(value, null, 2);
  return String(value);
}

export function SettingsItem({ setting, onUpdate }: SettingsItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: deleteSetting, isPending: isDeleting } =
    useDeleteSetting();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${setting.key}"?`)) {
      await deleteSetting(setting.key);
      onUpdate();
    }
  };

  if (isEditing) {
    return (
      <SettingsForm
        setting={setting}
        onSuccess={() => {
          setIsEditing(false);
          onUpdate();
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-mono text-lg">{setting.key}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{SETTING_TYPE_LABELS[setting.type]}</Badge>
          {setting.isPublic ? (
            <Badge variant="secondary" className="gap-1">
              <Eye className="h-3 w-3" />
              Public
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <EyeOff className="h-3 w-3" />
              Private
            </Badge>
          )}
        </div>
        <div className="bg-muted/30 rounded-lg p-3">
          <pre className="text-sm font-mono whitespace-pre-wrap break-all">
            {formatValue(setting.value, setting.type)}
          </pre>
        </div>
        {setting.description && (
          <p className="text-sm text-muted-foreground">{setting.description}</p>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        Updated: {new Date(setting.updatedAt).toLocaleString()}
      </CardFooter>
    </Card>
  );
}
