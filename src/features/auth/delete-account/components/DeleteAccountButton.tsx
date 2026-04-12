"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { DeleteAccountModal } from "./DeleteAccountModal";

export function DeleteAccountButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setIsModalOpen(true)}
        className="gap-2"
      >
        <AlertTriangle className="h-4 w-4" />
        Delete Account
      </Button>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
