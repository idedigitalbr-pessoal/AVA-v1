"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { teachersService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { AdminLoadingState } from "../components";

const teacherFormSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  specialization: z.string().optional(),
  department: z.string().optional(),
  area: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
});

type TeacherFormValues = z.infer<typeof teacherFormSchema>;

interface AdminTeacherFormProps {
  isEdit: boolean;
  teacherId?: string;
}

export function AdminTeacherForm({ isEdit, teacherId }: AdminTeacherFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(isEdit);

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      specialization: "",
      department: "",
      area: "",
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    async function load() {
      if (isEdit && teacherId) {
        try {
          const t = await teachersService.getById(teacherId);
          if (t) {
            form.reset({
              name: t.name,
              email: t.email,
              specialization: t.specialization || "",
              department: t.department || "",
              area: t.area || "",
              status: t.status || 'ACTIVE',
            });
          }
        } catch {
          toast.error("Erro ao carregar dados do professor.");
        } finally {
          setLoading(false);
        }
      }
    }
    load();
  }, [isEdit, teacherId, form]);

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      if (isEdit && teacherId) {
        await teachersService.update(teacherId, { ...data, role: 'PROFESSOR' });
        toast.success("Professor atualizado com sucesso.");
      } else {
        await teachersService.create({ ...data, role: 'PROFESSOR' });
        toast.success("Professor cadastrado com sucesso.");
      }
      router.push("/admin/professores");
    } catch {
      toast.error("Erro ao salvar professor.");
    }
  };

  if (loading) return <AdminLoadingState text="Carregando formulário..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/professores')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">
          {isEdit ? 'Editar Professor' : 'Novo Professor'}
        </h1>
      </div>

      <div className="max-w-2xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl><Input placeholder="Ex: Prof. Roberto Nogueira" {...field} /></FormControl>
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

              <FormField control={form.control} name="area" render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Atuação</FormLabel>
                  <FormControl><Input placeholder="Ex: Ciências Exatas" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <FormControl><Input placeholder="Ex: Tecnologia" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="specialization" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Especialização</FormLabel>
                  <FormControl><Input placeholder="Ex: Engenharia de Software" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/professores')}>Cancelar</Button>
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
