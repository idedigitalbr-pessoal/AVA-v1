"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Course } from "@/types";
import { courseService } from "@/lib/api/services/courses.service";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLoadingState, AdminEmptyState, AdminPageHeader } from "./components";
import { ArrowLeft, Edit, LayoutDashboard, BookOpen, Users, GraduationCap, Presentation, BookCheck, ClipboardList, Award, BarChart3, Settings } from "lucide-react";

interface AdminCourseDetailsProps {
  courseId: string;
}

export function AdminCourseDetails({ courseId }: AdminCourseDetailsProps) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getCourseById(courseId).then((data) => {
      setCourse(data || null);
      setLoading(false);
    });
  }, [courseId]);

  if (loading) return <AdminLoadingState text="Carregando detalhes do curso..." />;
  if (!course) return <AdminEmptyState title="Curso não encontrado" description="O curso que você tentou acessar não existe ou foi removido." action={<Button onClick={() => router.push("/admin/cursos")}>Voltar para Cursos</Button>} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push("/admin/cursos")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <AdminPageHeader 
        title={course.title} 
        description={`Código: ${course.code} | Grau: ${course.degree} | Modalidade: ${course.modality}`}
        action={
          <Button onClick={() => router.push(`/admin/cursos/${courseId}/editar`)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar Curso
          </Button>
        }
      />

      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="min-w-max">
            <TabsTrigger value="overview" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4" /> Visão Geral</TabsTrigger>
            <TabsTrigger value="curriculum" className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Matriz Curricular</TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2"><Users className="h-4 w-4" /> Turmas</TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Alunos</TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2"><Presentation className="h-4 w-4" /> Professores</TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2"><BookCheck className="h-4 w-4" /> Conteúdo AVA</TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Avaliações</TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2"><Award className="h-4 w-4" /> Certificados</TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Relatórios</TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2"><Settings className="h-4 w-4" /> Configurações</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-slate-500">Alunos Matriculados</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{course.totalStudents}</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-slate-500">Turmas Ativas</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{course.totalClasses}</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-slate-500">Carga Horária Total</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{course.workload}h</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-slate-500">Status</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {course.status === 'PUBLISHED' ? 'Publicado' : course.status === 'ARCHIVED' ? 'Arquivado' : 'Rascunho'}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Descrição</h4>
                  <p className="text-slate-700 mt-1">{course.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Coordenador</h4>
                  <p className="text-slate-700 mt-1">{course.coordinatorName || 'Não definido'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder for other tabs */}
          {["curriculum", "classes", "students", "teachers", "content", "assessments", "certificates", "reports", "settings"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{tab.replace('curriculum', 'Matriz Curricular').replace('classes', 'Turmas').replace('students', 'Alunos').replace('teachers', 'Professores').replace('content', 'Conteúdo AVA').replace('assessments', 'Avaliações').replace('certificates', 'Certificados').replace('reports', 'Relatórios').replace('settings', 'Configurações')}</CardTitle>
                  <CardDescription>Gerencie informações relacionadas a esta seção.</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex flex-col items-center justify-center border-t border-slate-100 bg-slate-50/50">
                  {tab === "content" ? (
                    <>
                      <p className="text-slate-500 mb-4">Gerencie os módulos, aulas e materiais deste curso em uma interface dedicada.</p>
                      <Button onClick={() => router.push(`/admin/cursos/${courseId}/conteudo`)}>Acessar Gerenciador de Conteúdo</Button>
                    </>
                  ) : tab === "curriculum" ? (
                    <>
                      <p className="text-slate-500 mb-4">Estruture os períodos, disciplinas e carga horária da matriz curricular.</p>
                      <Button onClick={() => router.push(`/admin/cursos/${courseId}/matriz-curricular`)}>Acessar Matriz Curricular</Button>
                    </>
                  ) : (
                    <p className="text-slate-500">Conteúdo da aba em desenvolvimento.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
