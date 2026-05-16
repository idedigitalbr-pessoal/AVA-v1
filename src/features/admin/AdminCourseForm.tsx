"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { courseService } from "@/lib/api/services/courses.service";
import { Course, CourseStatus, CourseModality, CourseDegree } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader, AdminLoadingState } from "./components";

const courseSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  code: z.string().min(2, "Mínimo 2 caracteres"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  modality: z.enum(["PRESENCIAL", "EAD", "HIBRIDO"]),
  degree: z.enum(["GRADUACAO", "POS_GRADUACAO", "LATO_SENSU", "STRICTO_SENSU", "EXTENSAO", "TECNICO", "LIVRE"]),
  workload: z.coerce.number().min(1, "A carga horária deve ser maior que zero"),
  coordinatorName: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface AdminCourseFormProps {
  courseId?: string;
}

export function AdminCourseForm({ courseId }: AdminCourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!courseId);
  const isEditing = !!courseId;

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      status: "DRAFT",
      modality: "PRESENCIAL",
      degree: "GRADUACAO",
      workload: 0,
      coordinatorName: "",
    },
  });

  useEffect(() => {
    if (courseId) {
      courseService.getCourseById(courseId).then((data) => {
        if (data) {
          form.reset({
            title: data.title,
            description: data.description,
            code: data.code,
            status: data.status,
            modality: data.modality,
            degree: data.degree,
            workload: data.workload,
            coordinatorName: data.coordinatorName || '',
          });
        } else {
          toast.error("Curso não encontrado.");
          router.push("/admin/cursos");
        }
        setLoading(false);
      });
    }
  }, [courseId, form, router]);

  async function onSubmit(data: CourseFormValues) {
    try {
      if (isEditing && courseId) {
        await courseService.updateCourse(courseId, data);
        toast.success("Curso atualizado com sucesso!");
        router.push(`/admin/cursos/${courseId}`);
      } else {
        const newCourse = await courseService.createCourse({
          ...data,
          totalModules: 0,
          totalStudents: 0,
          totalClasses: 0,
          instructorId: 'admin1', // placeholder
        });
        toast.success("Curso criado com sucesso!");
        router.push(`/admin/cursos/${newCourse.id}`);
      }
    } catch (error) {
      toast.error("Erro ao salvar o curso. Tente novamente.");
    }
  }

  if (loading) return <AdminLoadingState text="Carregando dados..." />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <AdminPageHeader 
        title={isEditing ? "Editar Curso" : "Novo Curso"} 
        description="Preencha os dados abaixo para configurar o curso no sistema."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Nome do Curso</FormLabel>
                    <FormControl><Input placeholder="Ex: Engenharia de Software" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl><Input placeholder="Ex: ENG001" {...field} className="font-mono" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grau</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecione o grau" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GRADUACAO">Graduação</SelectItem>
                        <SelectItem value="POS_GRADUACAO">Pós-Graduação</SelectItem>
                        <SelectItem value="LATO_SENSU">Lato Sensu</SelectItem>
                        <SelectItem value="STRICTO_SENSU">Stricto Sensu</SelectItem>
                        <SelectItem value="EXTENSAO">Extensão</SelectItem>
                        <SelectItem value="TECNICO">Técnico</SelectItem>
                        <SelectItem value="LIVRE">Livre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modalidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecione a modalidade" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                        <SelectItem value="EAD">EAD</SelectItem>
                        <SelectItem value="HIBRIDO">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carga Horária (horas)</FormLabel>
                    <FormControl><Input type="number" placeholder="Ex: 3200" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status inicial</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Rascunho</SelectItem>
                        <SelectItem value="PUBLISHED">Publicado</SelectItem>
                        <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coordinatorName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nome do Coordenador</FormLabel>
                    <FormControl><Input placeholder="Ex: Prof. Dr. Silva" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Descrição / Ementa Geral</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Breve descrição sobre o curso..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Salvar Alterações" : "Criar Curso"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
