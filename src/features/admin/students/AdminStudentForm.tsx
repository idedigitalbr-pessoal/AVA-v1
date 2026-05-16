"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { studentsService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { AdminLoadingState } from "../components";

const studentFormSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().optional(),
  registrationNumber: z.string().min(3, "Matrícula muito curta"),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface AdminStudentFormProps {
  isEdit: boolean;
  studentId?: string;
}

export function AdminStudentForm({ isEdit, studentId }: AdminStudentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(isEdit);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      registrationNumber: "",
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    async function load() {
      if (isEdit && studentId) {
        try {
          const s = await studentsService.getById(studentId);
          if (s) {
            form.reset({
              name: s.name,
              email: s.email,
              cpf: s.cpf || "",
              registrationNumber: s.registrationNumber,
              status: s.status || 'ACTIVE',
            });
          }
        } catch {
          toast.error("Erro ao carregar dados do aluno.");
        } finally {
          setLoading(false);
        }
      }
    }
    load();
  }, [isEdit, studentId, form]);

  const onSubmit = async (data: StudentFormValues) => {
    try {
      if (isEdit && studentId) {
        await studentsService.update(studentId, { ...data, role: 'ALUNO' });
        toast.success("Aluno atualizado com sucesso.");
      } else {
        await studentsService.create({ ...data, role: 'ALUNO' });
        toast.success("Aluno cadastrado com sucesso.");
      }
      router.push("/admin/alunos");
    } catch {
      toast.error("Erro ao salvar aluno.");
    }
  };

  if (loading) return <AdminLoadingState text="Carregando formulário..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/alunos')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">
          {isEdit ? 'Editar Aluno' : 'Novo Aluno'}
        </h1>
      </div>

      <div className="max-w-2xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl><Input placeholder="Ex: Ana Silva" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl><Input type="email" placeholder="email@exemplo.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="cpf" render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>RA / Matrícula</FormLabel>
                  <FormControl><Input placeholder="Ex: 2026001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Ativo</SelectItem>
                      <SelectItem value="INACTIVE">Inativo</SelectItem>
                      <SelectItem value="BLOCKED">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/alunos')}>Cancelar</Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? 'Salvar Alterações' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
