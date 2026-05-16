import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import React from "react";

interface AdminConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

export function AdminConfirmDialog({ title, description, onConfirm, children }: AdminConfirmDialogProps) {
  return (
    <ConfirmDeleteModal title={title} description={description} onConfirm={onConfirm}>
      {children}
    </ConfirmDeleteModal>
  );
}
