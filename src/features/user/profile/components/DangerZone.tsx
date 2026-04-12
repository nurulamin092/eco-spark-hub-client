"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { DeleteAccountButton } from "@/features/auth/delete-account/components/DeleteAccountButton";

export function DangerZone() {
  return (
    <Card className="border-destructive/20">
      <CardHeader className="bg-destructive/5 rounded-t-lg">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle>Danger Zone</CardTitle>
        </div>
        <CardDescription>
          Once you delete your account, there is no going back. This action is
          permanent.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Warning:</strong> Deleting your account will:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>
              Permanently remove your profile and all personal information
            </li>
            <li>Delete all your ideas, comments, and votes</li>
            <li>Remove all your bookmarks and saved items</li>
            <li>Cancel any active subscriptions</li>
            <li>This action cannot be undone</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <DeleteAccountButton />
      </CardFooter>
    </Card>
  );
}
