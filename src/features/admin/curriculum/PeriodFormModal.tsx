"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CurriculumPeriod } from "@/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const periodSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

type PeriodFormValues = z.infer<typeof periodSchema>;

interface PeriodFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  period?: CurriculumPeriod;
  onSubmit: (data: Partial<CurriculumPeriod>) => void;
}

export function PeriodFormModal({ isOpen, onClose, period, onSubmit }: PeriodFormModalProps) {
  const form = useForm<PeriodFormValues>({
    resolver: zodResolver(periodSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (period && isOpen) {
      form.reset({
        name: period.name,
      });
    } else if (isOpen) {
      form.reset({
        name: "",
      });
    }
  }, [period, isOpen, form]);

  const handleSubmit = (data: PeriodFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{period ? "Editar Período" : "Novo Período"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="period-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Período</FormLabel>
                  <FormControl><Input placeholder="Ex: 1º Semestre, Módulo Básico..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" form="period-form">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
