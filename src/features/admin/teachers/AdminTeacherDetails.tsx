"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { teachersService } from "@/lib/api";
import { Teacher } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Key, CheckCircle, Ban, BookOpen, Users, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLoadingState, AdminEmptyState, AdminStatusBadge } from "../components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AdminTeacherDetailsProps {
  teacherId: string;
}

export function AdminTeacherDetails({ teacherId }: AdminTeacherDetailsProps) {
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await teachersService.getById(teacherId);
        if (data) setTeacher(data);
        else {
          toast.error("Professor não encontrado.");
          router.push('/admin/professores');
        }
      } catch {
        toast.error("Erro ao carregar detalhes do professor.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [teacherId, router]);

  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      const resp = await action();
      if (typeof resp === 'object' && resp !== null) {
        setTeacher(resp);
      }
      toast.success(successMsg);
    } catch {
      toast.error("Erro ao executar ação.");
    }
  };

  const renderStatus = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">Ativo</Badge>;
      case 'INACTIVE':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-none">Inativo</Badge>;
      case 'BLOCKED':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-none">Bloqueado</Badge>;
      default:
        return <Badge variant="outline">Ativo</Badge>; // Default mock is ACTIVE if empty
    }
  };

  if (loading) return <AdminLoadingState text="Carregando detalhes do professor..." />;
  if (!teacher) return <AdminEmptyState title="Professor não encontrado" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/professores')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border border-slate-200">
            <AvatarImage src={teacher.avatarUrl || 'https://via.placeholder.com/150'} alt={teacher.name} />
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{teacher.name}</h1>
              {renderStatus(teacher.status)}
            </div>
            <p className="text-slate-500">
              Área: <span className="font-medium text-slate-700">{teacher.area || '-'}</span> |  
              Depto: <span className="font-medium text-slate-700">{teacher.department || '-'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => toast.success("Vinculando disciplina...")}>
            <BookOpen className="h-4 w-4 mr-2" /> Vincular Disciplina
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Vinculando turma...")}>
            <Users className="h-4 w-4 mr-2" /> Vincular Turma
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/professores/${teacher.id}/editar`)}>
            <Edit className="h-4 w-4 mr-2" /> Editar
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction(() => teachersService.resetPassword(teacher.id), "Senha redefinida com sucesso.")}>
            <Key className="h-4 w-4 mr-2" /> Redefinir Senha
          </Button>
          {teacher.status === 'BLOCKED' ? (
             <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleAction(() => teachersService.activeAccess(teacher.id), "Acesso ativado.")}>
               <CheckCircle className="h-4 w-4 mr-2" /> Ativar
             </Button>
          ) : (
            <Button variant="destructive" size="sm" onClick={() => handleAction(() => teachersService.blockAccess(teacher.id), "Acesso bloqueado.")}>
              <Ban className="h-4 w-4 mr-2" /> Bloquear
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Tabs defaultValue="visaogeral" className="w-full">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4">
            <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto">
              <TabsTrigger value="visaogeral" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Visão Geral</TabsTrigger>
              <TabsTrigger value="disciplinas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Disciplinas</TabsTrigger>
              <TabsTrigger value="turmas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Turmas</TabsTrigger>
              <TabsTrigger value="conteudos" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Conteúdos</TabsTrigger>
              <TabsTrigger value="avaliacoes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Avaliações</TabsTrigger>
              <TabsTrigger value="notas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Notas Lançadas</TabsTrigger>
              <TabsTrigger value="frequencia" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Frequência Lançada</TabsTrigger>
              <TabsTrigger value="mensagens" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Mensagens</TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Histórico</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="visaogeral" className="m-0 focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Dados Pessoais</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Nome:</span> {teacher.name}</p>
                     <p><span className="font-medium text-slate-900">E-mail:</span> {teacher.email}</p>
                     <p><span className="font-medium text-slate-900">CPF:</span> {(teacher as any).cpf || '-'}</p>
                     <p><span className="font-medium text-slate-900">Telefone:</span> {(teacher as any).phone || '-'}</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Formação e Atuação</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Titulação:</span> {(teacher as any).degree || 'Não informada'}</p>
                     <p><span className="font-medium text-slate-900">Especialização:</span> {teacher.specialization || '-'}</p>
                     <p><span className="font-medium text-slate-900">Área:</span> {teacher.area || '-'}</p>
                     <p><span className="font-medium text-slate-900">Departamento:</span> {teacher.department || '-'}</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Acesso e Sistema</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Último Login:</span> {teacher.lastAccessAt ? new Date(teacher.lastAccessAt).toLocaleString('pt-BR') : 'Nunca acessou'}</p>
                     <p><span className="font-medium text-slate-900">Data de Cadastro:</span> {new Date(teacher.createdAt).toLocaleDateString('pt-BR')}</p>
                     <p><span className="font-medium text-slate-900">Lattes:</span> {(teacher as any).lattes ? <a href={(teacher as any).lattes} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Ver Currículo</a> : '-'}</p>
                   </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="disciplinas" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Nenhuma disciplina vinculada ainda. <Button variant="link" onClick={() => toast.success("Redirecionando...")}>Vincular Disciplina</Button></p>
              </div>
            </TabsContent>

            <TabsContent value="turmas" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Nenhuma turma alocada no momento. <Button variant="link" onClick={() => toast.success("Redirecionando...")}>Vincular Turma</Button></p>
              </div>
            </TabsContent>

            <TabsContent value="conteudos" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Aulas, arquivos e vídeos produzidos ou vinculados pelo professor.</p>
              </div>
            </TabsContent>

            <TabsContent value="avaliacoes" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Provas e avaliações elaboradas.</p>
              </div>
            </TabsContent>

            <TabsContent value="notas" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Últimos lançamentos de notas no diário escolar.</p>
              </div>
            </TabsContent>

            <TabsContent value="frequencia" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Registo de frequência dos alunos no diário escolar.</p>
              </div>
            </TabsContent>

            <TabsContent value="mensagens" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Fóruns e mensagens enviadas e recebidas pelo professor.</p>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Histórico de acessos, logs de sistema e auditoria do professor.</p>
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  );
}
