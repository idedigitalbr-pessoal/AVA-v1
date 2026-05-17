"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { subjectsService } from "@/lib/api";
import { Subject } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminPageHeader, AdminLoadingState, AdminEmptyState } from "../components";
import { ArrowLeft, BookOpen, Clock, Settings, GraduationCap, Grid, LibraryBig, Upload, Archive, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminSubjectPlanoEnsino } from "./AdminSubjectPlanoEnsino";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminSubjectDetailsProps {
  subjectId: string;
}

export function AdminSubjectDetails({ subjectId }: AdminSubjectDetailsProps) {
  const router = useRouter();
  const [sub, setSub] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubject() {
      setLoading(true);
      try {
        const data = await subjectsService.getSubjectById(subjectId);
        if (data) {
          setSub(data);
        } else {
          toast.error("Disciplina não encontrada");
          router.push("/admin/disciplinas");
        }
      } catch {
        toast.error("Erro ao carregar detalhes");
      } finally {
        setLoading(false);
      }
    }
    loadSubject();
  }, [subjectId, router]);

  const renderStatus = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">Ativa</Badge>;
      case 'ARCHIVED':
        return <Badge variant="outline" className="text-slate-400 border-slate-200">Arquivada</Badge>;
      case 'DRAFT':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-none">Rascunho</Badge>;
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  if (loading) return <AdminLoadingState text="Carregando detalhes..." />;
  if (!sub) return <AdminEmptyState title="Disciplina não encontrada" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/disciplinas')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{sub.code} - {sub.name}</h1>
            {renderStatus(sub.status)}
          </div>
          <p className="text-slate-500">Área: <span className="font-medium text-slate-700">{sub.area || 'Não definida'}</span></p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 h-9 px-4 py-2">
              <Settings className="h-4 w-4" />
              Ações da Disciplina
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => router.push(`/admin/disciplinas/${sub.id}/editar`)}>
                <Settings className="mr-2 h-4 w-4" /> Editar Disciplina
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Disciplina publicada com sucesso!")}>
                <Upload className="mr-2 h-4 w-4" /> Publicar Disciplina
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Modal abrirá em breve...")}>
                <LayoutGrid className="mr-2 h-4 w-4" /> Vincular Curso
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success("Disciplina arquivada.")} className="text-red-600 focus:text-red-600">
                <Archive className="mr-2 h-4 w-4" /> Arquivar Disciplina
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Clock className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Carga Horária</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{sub.workload}h</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <GraduationCap className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Cursos Vinculados</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{sub.linkedCourses?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <LibraryBig className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Turmas</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">0</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <BookOpen className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Tópicos/Módulos</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Tabs defaultValue="visao-geral" className="w-full">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4">
            <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto">
              <TabsTrigger value="visao-geral" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Visão Geral</TabsTrigger>
              <TabsTrigger value="plano-ensino" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Plano de Ensino</TabsTrigger>
              <TabsTrigger value="conteudo" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Conteúdo Base</TabsTrigger>
              <TabsTrigger value="atividades" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Atividades</TabsTrigger>
              <TabsTrigger value="quizzes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Quizzes</TabsTrigger>
              <TabsTrigger value="provas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Provas</TabsTrigger>
              <TabsTrigger value="banco-questoes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Banco de Questões</TabsTrigger>
              <TabsTrigger value="turmas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Turmas</TabsTrigger>
              <TabsTrigger value="professores" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Prof. Habilitados</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="visao-geral" className="m-0 focus:outline-none space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Descrição</h3>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">{sub.description || 'Sem descrição cadastrada.'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Cursos Ofertados</h3>
                {sub.linkedCourses?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {sub.linkedCourses.map(c => <Badge key={c.id} variant="secondary">{c.name}</Badge>)}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Nenhum curso utiliza esta disciplina ainda.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="plano-ensino" className="m-0 focus:outline-none">
              <AdminSubjectPlanoEnsino subject={sub} />
            </TabsContent>

            <TabsContent value="conteudo" className="m-0 focus:outline-none">
              <div className="text-slate-500 text-center py-12">
                <Grid className="h-10 w-10 mx-auto text-slate-200 mb-4" />
                <p>Aqui você poderá criar os módulos e aulas base que serão aproveitados por todas as turmas desta disciplina.</p>
              </div>
            </TabsContent>

            <TabsContent value="atividades" className="m-0 focus:outline-none text-center py-12 text-slate-500">
               <p>Modelos de atividades padrão da disciplina.</p>
            </TabsContent>

            <TabsContent value="quizzes" className="m-0 focus:outline-none text-center py-12 text-slate-500">
               <p>Quizzes interativos e gamificação vinculados à disciplina.</p>
            </TabsContent>

            <TabsContent value="provas" className="m-0 focus:outline-none text-center py-12 text-slate-500">
               <p>Gerenciador de avaliações e provas institucionais.</p>
            </TabsContent>

            <TabsContent value="banco-questoes" className="m-0 focus:outline-none text-center py-12 text-slate-500">
               <p>Banco de questões reutilizáveis para quizzes e provas desta disciplina.</p>
            </TabsContent>

            <TabsContent value="turmas" className="m-0 focus:outline-none text-center py-12 text-slate-500">
               <p>Veja as turmas abertas em que esta disciplina está presente.</p>
            </TabsContent>

            <TabsContent value="professores" className="m-0 focus:outline-none text-center py-12 text-slate-500">
               <p>Vincule os professores capacitados para lecionar esta disciplina.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
