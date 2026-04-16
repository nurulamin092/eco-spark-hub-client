"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SettingsItem } from "./SettingsItem";
import { SettingsSkeleton } from "./SettingsSkeleton";
import { CreateSettingDialog } from "./CreateSettingDialog";
import { useAllSettings } from "../hooks/useAllSettings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function SettingsList() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: settings, isLoading, error, refetch } = useAllSettings();

  if (isLoading) return <SettingsSkeleton />;
  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load settings</AlertDescription>
      </Alert>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">
            Manage application configuration
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>
      {!settings?.length ? (
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          No settings found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.map((setting) => (
            <SettingsItem
              key={setting.id}
              setting={setting}
              onUpdate={() => refetch()}
            />
          ))}
        </div>
      )}
      <CreateSettingDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
