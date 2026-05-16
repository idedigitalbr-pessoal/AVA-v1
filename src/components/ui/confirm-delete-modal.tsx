"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmDeleteModalProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

export function ConfirmDeleteModal({
  title = "Você tem certeza?",
  description = "Esta ação não pode ser desfeita. Isso excluirá permanentemente os dados do sistema.",
  onConfirm,
  children,
}: ConfirmDeleteModalProps) {
  return (
    <AlertDialog>
      {React.isValidElement(children) ? (
        <AlertDialogTrigger render={children as React.ReactElement} />
      ) : (
        <AlertDialogTrigger>
          {children}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
