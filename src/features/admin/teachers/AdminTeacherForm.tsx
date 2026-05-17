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
  cpf: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  specialization: z.string().optional(),
  degree: z.string().optional(),
  institution: z.string().optional(),
  lattes: z.string().optional(),
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
      cpf: "",
      phone: "",
      birthDate: "",
      degree: "Mestrado",
      institution: "",
      lattes: "",
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
              cpf: (t as any).cpf || "",
              phone: t.phone || "",
              birthDate: t.birthDate || "",
              degree: "Mestrado", // mocked, usually from t.degree
              institution: "USP", // mocked
              lattes: "http://lattes.cnpq.br/mock", // mocked
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
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Dados Pessoais</h3>
              </div>

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

              <FormField control={form.control} name="cpf" render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="birthDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Formação e Atuação</h3>
              </div>

              <FormField control={form.control} name="degree" render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulação Máxima</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Graduacao">Graduação</SelectItem>
                      <SelectItem value="Especializacao">Especialização</SelectItem>
                      <SelectItem value="Mestrado">Mestrado</SelectItem>
                      <SelectItem value="Doutorado">Doutorado</SelectItem>
                      <SelectItem value="Pos-Doutorado">Pós-Doutorado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="institution" render={({ field }) => (
                <FormItem>
                  <FormLabel>Instituição de Formação</FormLabel>
                  <FormControl><Input placeholder="Ex: USP, UNICAMP..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="lattes" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Link Currículo Lattes</FormLabel>
                  <FormControl><Input placeholder="http://lattes.cnpq.br/..." {...field} /></FormControl>
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
                  <FormLabel>Especialização Principal</FormLabel>
                  <FormControl><Input placeholder="Ex: Engenharia de Software" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Acesso</h3>
              </div>

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status no Sistema</FormLabel>
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
