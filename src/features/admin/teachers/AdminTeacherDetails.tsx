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
        <Tabs defaultValue="perfil" className="w-full">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4">
            <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto">
              <TabsTrigger value="perfil" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Perfil</TabsTrigger>
              <TabsTrigger value="disciplinas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Disciplinas</TabsTrigger>
              <TabsTrigger value="turmas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Turmas</TabsTrigger>
              <TabsTrigger value="conteudos" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Conteúdos Criados</TabsTrigger>
              <TabsTrigger value="atividades" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Atividades</TabsTrigger>
              <TabsTrigger value="correcoes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Correções Pendentes</TabsTrigger>
              <TabsTrigger value="mensagens" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Mensagens</TabsTrigger>
              <TabsTrigger value="relatorios" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Relatórios</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="perfil" className="m-0 focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h3 className="text-sm font-semibold text-slate-900 mb-2">Dados Pessoais</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Nome:</span> {teacher.name}</p>
                     <p><span className="font-medium text-slate-900">E-mail:</span> {teacher.email}</p>
                     <p><span className="font-medium text-slate-900">Especialização:</span> {teacher.specialization}</p>
                   </div>
                 </div>
                 <div>
                   <h3 className="text-sm font-semibold text-slate-900 mb-2">Acesso</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Último Login:</span> {teacher.lastAccessAt ? new Date(teacher.lastAccessAt).toLocaleString('pt-BR') : 'Nunca acessou'}</p>
                     <p><span className="font-medium text-slate-900">Data de Cadastro:</span> {new Date(teacher.createdAt).toLocaleDateString('pt-BR')}</p>
                   </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="disciplinas" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Disciplinas cadastradas e vinculadas a este professor. <Button variant="link" onClick={() => router.push('/admin/disciplinas')}>Ver Disciplinas</Button></p>
            </TabsContent>

            <TabsContent value="turmas" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Turmas onde o professor atua e tem aulas. <Button variant="link" onClick={() => router.push('/admin/turmas')}>Ver Turmas</Button></p>
            </TabsContent>

            <TabsContent value="conteudos" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Aulas, arquivos e vídeos produzidos ou vinculados pelo professor.</p>
            </TabsContent>

            <TabsContent value="atividades" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Trabalhos e listas de exercícios criadas no AVA.</p>
            </TabsContent>

            <TabsContent value="correcoes" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Trabalhos de alunos esperando notas e feedback do professor.</p>
            </TabsContent>

            <TabsContent value="mensagens" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Fóruns e mensagens enviadas e recebidas pelo professor.</p>
            </TabsContent>

            <TabsContent value="relatorios" className="m-0 focus:outline-none text-center py-12 text-slate-500">
              <p>Engajamento, médias das turmas e feedbacks dos alunos sobre o professor.</p>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  );
}
