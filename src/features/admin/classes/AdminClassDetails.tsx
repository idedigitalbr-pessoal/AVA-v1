"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { classesService, coursesService } from "@/lib/api";
import { Class, Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminPageHeader, AdminLoadingState, AdminEmptyState, AdminConfirmDialog } from "../components";
import { ArrowLeft, Users, BookOpen, GraduationCap, Calendar, Settings, Activity, Copy, Power, PowerOff, Archive, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminClassDetailsProps {
  classId: string;
}

export function AdminClassDetails({ classId }: AdminClassDetailsProps) {
  const router = useRouter();
  const [cls, setCls] = useState<Class | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClass() {
      setLoading(true);
      try {
        const clsData = await classesService.getClassById(classId);
        if (clsData) {
          setCls(clsData);
          if (clsData.courseId) {
            const cData = await coursesService.getCourseById(clsData.courseId);
            setCourse(cData || null);
          }
        } else {
          toast.error("Turma não encontrada");
          router.push("/admin/turmas");
        }
      } catch {
        toast.error("Erro ao carregar detalhes");
      } finally {
        setLoading(false);
      }
    }
    loadClass();
  }, [classId, router]);

  const renderStatus = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">Ativa</Badge>;
      case 'FINISHED':
        return <Badge variant="outline" className="text-slate-500">Concluída</Badge>;
      case 'ARCHIVED':
        return <Badge variant="outline" className="text-slate-400 border-slate-200">Arquivada</Badge>;
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  if (loading) return <AdminLoadingState text="Carregando detalhes da turma..." />;
  if (!cls) return <AdminEmptyState title="Turma não encontrada" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/turmas')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{cls.name}</h1>
            {renderStatus(cls.status)}
          </div>
          <p className="text-slate-500">Curso: <span className="font-medium text-slate-700">{course?.title || 'Não vinculado'}</span></p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 h-9 px-4 py-2">
              <Settings className="h-4 w-4" />
              Ações da Turma
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => router.push(`/admin/turmas/${cls.id}/editar`)}>
                <Settings className="mr-2 h-4 w-4" /> Editar Turma
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Turma ativada com sucesso!")}>
                <Power className="mr-2 h-4 w-4" /> Ativar Turma
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Turma duplicada com sucesso!")}>
                <Copy className="mr-2 h-4 w-4" /> Duplicar Turma
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success("Turma encerrada.")}>
                <CheckCircle className="mr-2 h-4 w-4" /> Encerrar Turma
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Turma arquivada.")} className="text-red-600 focus:text-red-600">
                <Archive className="mr-2 h-4 w-4" /> Arquivar Turma
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Calendar className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Período Letivo</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{cls.academicYear}</p>
          <p className="text-xs text-slate-500 mt-1">{cls.startDate} a {cls.endDate}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Users className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Alunos</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{cls.studentsCount || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Matriculados ativos</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <BookOpen className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Disciplinas</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{cls.subjectsCount || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Na matriz da turma</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Activity className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Progresso Médio</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">0%</p>
          <p className="text-xs text-slate-500 mt-1">Conclusão da turma</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Tabs defaultValue="visao-geral" className="w-full">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4">
            <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto">
              <TabsTrigger value="visao-geral" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Visão Geral</TabsTrigger>
              <TabsTrigger value="alunos" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Alunos</TabsTrigger>
              <TabsTrigger value="professores" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Professores</TabsTrigger>
              <TabsTrigger value="disciplinas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Disciplinas</TabsTrigger>
              <TabsTrigger value="frequencia" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Frequência</TabsTrigger>
              <TabsTrigger value="notas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Notas</TabsTrigger>
              <TabsTrigger value="atividades" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Atividades</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="visao-geral" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <p>Aqui você verá um resumo operacional da turma.</p>
              </div>
            </TabsContent>

            <TabsContent value="alunos" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <Users className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                <p>Gerenciamento de alunos matriculados nesta turma será implementado aqui.</p>
              </div>
            </TabsContent>

            <TabsContent value="professores" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <GraduationCap className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                <p>Alocação de professores para cada disciplina da turma.</p>
              </div>
            </TabsContent>

            <TabsContent value="disciplinas" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <BookOpen className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                <p>Vínculo de disciplinas do currículo a esta turma específica.</p>
              </div>
            </TabsContent>

            <TabsContent value="frequencia" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <p>Módulo de gestão de frequência acadêmica e diários de classe.</p>
              </div>
            </TabsContent>

            <TabsContent value="notas" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <p>Lançamento de notas, médias e boletins da turma.</p>
              </div>
            </TabsContent>

            <TabsContent value="atividades" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12 border rounded-lg border-dashed">
                <Activity className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                <p>Trabalhos, exercícios e atividades desta turma.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
