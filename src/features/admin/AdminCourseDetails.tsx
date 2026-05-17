"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Course } from "@/types";
import { courseService } from "@/lib/api/services/course.service";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLoadingState, AdminEmptyState, AdminPageHeader } from "./components";
import { ArrowLeft, Edit, LayoutDashboard, BookOpen, Users, GraduationCap, Presentation, BookCheck, ClipboardList, Award, BarChart3, Settings } from "lucide-react";

import { CurriculumMatrixManager } from "./curriculum/CurriculumMatrixManager";
import { AdminCourseContentManager } from "./ava/AdminCourseContentManager";
import { CourseClassesTab } from "./courses/tabs/CourseClassesTab";
import { CourseStudentsTab } from "./courses/tabs/CourseStudentsTab";
import { CourseTeachersTab } from "./courses/tabs/CourseTeachersTab";
import { CourseAssessmentsTab } from "./courses/tabs/CourseAssessmentsTab";
import { CourseCertificatesTab } from "./courses/tabs/CourseCertificatesTab";
import { CourseReportsTab } from "./courses/tabs/CourseReportsTab";
import { CourseSettingsTab } from "./courses/tabs/CourseSettingsTab";

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardHeader className="py-2"><CardTitle className="text-xs font-medium text-slate-500">Alunos</CardTitle></CardHeader>
                <CardContent className="pb-4"><p className="text-2xl font-bold">{course.totalStudents}</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2"><CardTitle className="text-xs font-medium text-slate-500">Turmas</CardTitle></CardHeader>
                <CardContent className="pb-4"><p className="text-2xl font-bold">{course.totalClasses}</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2"><CardTitle className="text-xs font-medium text-slate-500">Carga Horária</CardTitle></CardHeader>
                <CardContent className="pb-4"><p className="text-2xl font-bold">{course.workload}h</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2"><CardTitle className="text-xs font-medium text-slate-500">Status</CardTitle></CardHeader>
                <CardContent className="pb-4">
                  <p className="text-xl font-bold">
                    {course.status === 'PUBLISHED' ? 'Publicado' : course.status === 'ARCHIVED' ? 'Arquivado' : 'Rascunho'}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2"><CardTitle className="text-xs font-medium text-slate-500">Modalidade</CardTitle></CardHeader>
                <CardContent className="pb-4"><p className="text-xl font-bold truncate" title={course.modality}>{course.modality}</p></CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2"><CardTitle className="text-xs font-medium text-slate-500">Coordenador</CardTitle></CardHeader>
                <CardContent className="pb-4"><p className="text-sm font-bold truncate" title={course.coordinatorName || 'Indefinido'}>{course.coordinatorName || 'N/A'}</p></CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre o Curso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{course.description}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo Acadêmico</CardTitle>
                    <CardDescription>Métricas automatizadas e status do curso.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
                        <BookOpen className="h-6 w-6 text-blue-500 mb-2" />
                        <span className="text-2xl font-bold">12</span>
                        <span className="text-xs text-slate-500 mt-1 uppercase text-center">Disciplinas</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
                        <ClipboardList className="h-6 w-6 text-green-500 mb-2" />
                        <span className="text-2xl font-bold">48</span>
                        <span className="text-xs text-slate-500 mt-1 uppercase text-center">Avaliações</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
                        <Award className="h-6 w-6 text-yellow-500 mb-2" />
                        <span className="text-2xl font-bold">150</span>
                        <span className="text-xs text-slate-500 mt-1 uppercase text-center">Certificados Emitidos</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
                        <BarChart3 className="h-6 w-6 text-red-500 mb-2" />
                        <span className="text-2xl font-bold">3</span>
                        <span className="text-xs text-slate-500 mt-1 uppercase text-center">Pendências</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push(`/admin/cursos/${courseId}/editar`)}>
                      <Edit className="h-4 w-4 mr-2" /> Editar Informações
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push(`/admin/cursos/${courseId}/conteudo`)}>
                      <BookCheck className="h-4 w-4 mr-2" /> Gerenciar Conteúdo AVA
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push(`/admin/cursos/${courseId}/matriz-curricular`)}>
                      <LayoutDashboard className="h-4 w-4 mr-2" /> Abrir Matriz Curricular
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push(`/admin/turmas/novo?courseId=${courseId}`)}>
                      <Users className="h-4 w-4 mr-2" /> Criar Turma
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push(`/admin/professores/vincular?courseId=${courseId}`)}>
                      <Presentation className="h-4 w-4 mr-2" /> Vincular Professor
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum">
            <Card>
              <CardContent className="p-6">
                <CurriculumMatrixManager courseId={courseId} embedded={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes">
            <Card>
              <CardContent className="p-6">
                <CourseClassesTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardContent className="p-6">
                <CourseStudentsTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <Card>
              <CardContent className="p-6">
                <CourseTeachersTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardContent className="p-6">
                <AdminCourseContentManager courseId={courseId} embedded={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments">
            <Card>
              <CardContent className="p-6">
                <CourseAssessmentsTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardContent className="p-6">
                <CourseCertificatesTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardContent className="p-6">
                <CourseReportsTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <CourseSettingsTab courseId={courseId} />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
