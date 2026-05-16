"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { subjectsService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminPageHeader, AdminLoadingState } from "../components";
import { ArrowLeft } from "lucide-react";

const subjectFormSchema = z.object({
  code: z.string().min(2, "Código muito curto"),
  name: z.string().min(3, "Nome muito curto"),
  workload: z.coerce.number().min(1, "A carga horária deve ser maior que zero"),
  area: z.string().optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'DRAFT']),
  description: z.string().optional(),
});

interface SubjectFormValues {
  code: string;
  name: string;
  workload: number;
  area?: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
  description?: string;
}

interface AdminSubjectFormProps {
  isEdit: boolean;
  subjectId?: string;
}

export function AdminSubjectForm({ isEdit, subjectId }: AdminSubjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(isEdit);

  const form = useForm<any>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      code: "",
      name: "",
      workload: 60,
      area: "",
      status: 'ACTIVE' as SubjectFormValues['status'],
      description: ""
    },
  });

  useEffect(() => {
    async function loadSubject() {
      try {
        const sub = await subjectsService.getSubjectById(subjectId!);
        if (sub) {
          form.reset({
            code: sub.code,
            name: sub.name,
            workload: sub.workload,
            area: sub.area || "",
            status: sub.status || 'ACTIVE',
            description: sub.description || ""
          });
        } else {
          toast.error("Disciplina não encontrada");
          router.push("/admin/disciplinas");
        }
      } catch {
        toast.error("Erro ao carregar disciplina");
      } finally {
        setLoading(false);
      }
    }

    if (isEdit && subjectId) {
      loadSubject();
    }
  }, [isEdit, subjectId, form, router]);

  const onSubmit = async (data: any) => {
    try {
      if (isEdit && subjectId) {
        await subjectsService.updateSubject(subjectId, data);
        toast.success("Disciplina atualizada com sucesso!");
        router.push(`/admin/disciplinas/${subjectId}`);
      } else {
        const newSub = await subjectsService.createSubject(data);
        toast.success("Disciplina criada com sucesso!");
        router.push(`/admin/disciplinas/${newSub.id}`);
      }
    } catch {
      toast.error("Erro ao salvar disciplina. Tente novamente.");
    }
  };

  if (loading) return <AdminLoadingState text="Carregando formulário..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <AdminPageHeader 
        title={isEdit ? "Editar Disciplina" : "Nova Disciplina"} 
        description="Preencha os dados da disciplina para seu catálogo."
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <FormField control={form.control} name="code" render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl><Input placeholder="Ex: MAT001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Disciplina</FormLabel>
                  <FormControl><Input placeholder="Ex: Cálculo I" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="workload" render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária (h)</FormLabel>
                  <FormControl><Input type="number" min={1} placeholder="Ex: 60" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="area" render={({ field }) => (
                <FormItem>
                  <FormLabel>Área do Conhecimento</FormLabel>
                  <FormControl><Input placeholder="Ex: Ciências Exatas" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Status geral" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Ativa</SelectItem>
                      <SelectItem value="DRAFT">Rascunho</SelectItem>
                      <SelectItem value="ARCHIVED">Arquivada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Breve</FormLabel>
                <FormControl><Textarea className="resize-none" rows={3} placeholder="Resumo do que aborda a disciplina..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
              <Button type="submit">Salvar Disciplina</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
