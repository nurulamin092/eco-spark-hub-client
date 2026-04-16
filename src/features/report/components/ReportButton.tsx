"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { ReportModal } from "./ReportModal";

interface ReportButtonProps {
  type: "IDEA" | "COMMENT";
  targetId: string;
  size?: "default" | "sm" | "lg" | "xs";
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
}

export function ReportButton({
  type,
  targetId,
  size = "sm",
  variant = "ghost",
}: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className="gap-1"
      >
        <Flag className="h-3 w-3" />
        Report
      </Button>
      <ReportModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={type}
        targetId={targetId}
      />
    </>
  );
}
