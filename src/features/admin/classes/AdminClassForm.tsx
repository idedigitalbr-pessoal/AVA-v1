"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { classesService } from "@/lib/api";
import { useCourses } from "@/hooks/use-queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminPageHeader, AdminLoadingState } from "../components";
import { ArrowLeft } from "lucide-react";

const classFormSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  courseId: z.string().min(1, "Selecione o curso"),
  academicYear: z.string().min(4, "Ano letivo (ex: 2026/1)"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de fim é obrigatória"),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'FINISHED']).default('ACTIVE'),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

interface AdminClassFormProps {
  isEdit: boolean;
  classId?: string;
}

export function AdminClassForm({ isEdit, classId }: AdminClassFormProps) {
  const router = useRouter();
  const { data: courses, isLoading: isCoursesLoading } = useCourses();
  const [loading, setLoading] = useState(isEdit);

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: "",
      courseId: "",
      academicYear: "",
      startDate: "",
      endDate: "",
      status: 'ACTIVE'
    },
  });

  useEffect(() => {
    async function loadClass() {
      try {
        const cls = await classesService.getClassById(classId!);
        if (cls) {
          form.reset({
            name: cls.name,
            courseId: cls.courseId,
            academicYear: cls.academicYear,
            startDate: cls.startDate,
            endDate: cls.endDate,
            status: cls.status || 'ACTIVE'
          });
        } else {
          toast.error("Turma não encontrada");
          router.push("/admin/turmas");
        }
      } catch {
        toast.error("Erro ao carregar turma");
      } finally {
        setLoading(false);
      }
    }

    if (isEdit && classId) {
      loadClass();
    }
  }, [isEdit, classId, form, router]);

  const onSubmit = async (data: ClassFormValues) => {
    try {
      if (isEdit && classId) {
        await classesService.updateClass(classId, data);
        toast.success("Turma atualizada com sucesso!");
        router.push(`/admin/turmas/${classId}`);
      } else {
        const newClass = await classesService.createClass(data);
        toast.success("Turma criada com sucesso!");
        router.push(`/admin/turmas/${newClass.id}`);
      }
    } catch {
      toast.error("Erro ao salvar turma. Tente novamente.");
    }
  };

  if (loading || isCoursesLoading) return <AdminLoadingState text="Carregando formulário..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <AdminPageHeader 
        title={isEdit ? "Editar Turma" : "Nova Turma"} 
        description="Preencha os dados abaixo para cadastrar a turma."
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Turma</FormLabel>
                  <FormControl><Input placeholder="Ex: Turma A - Engenharia" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="courseId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso Vinculado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione o curso" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {courses?.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="academicYear" render={({ field }) => (
                <FormItem>
                  <FormLabel>Período / Ano Letivo</FormLabel>
                  <FormControl><Input placeholder="Ex: 2026/1" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Status da turma" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Ativa</SelectItem>
                      <SelectItem value="FINISHED">Concluída</SelectItem>
                      <SelectItem value="ARCHIVED">Arquivada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="startDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="endDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Fim</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
              <Button type="submit">Salvar Turma</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
