"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { studentsService } from "@/lib/api";
import { Student } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Key, CheckCircle, Ban, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLoadingState, AdminEmptyState } from "../components";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminStudentDetailsProps {
  studentId: string;
}

export function AdminStudentDetails({ studentId }: AdminStudentDetailsProps) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await studentsService.getById(studentId);
        if (data) setStudent(data);
        else {
          toast.error("Aluno não encontrado.");
          router.push('/admin/alunos');
        }
      } catch {
        toast.error("Erro ao carregar detalhes do aluno.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [studentId, router]);

  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      const resp = await action();
      if (typeof resp === 'object' && resp !== null) {
        setStudent(resp);
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

  if (loading) return <AdminLoadingState text="Carregando detalhes do aluno..." />;
  if (!student) return <AdminEmptyState title="Aluno não encontrado" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/alunos')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border border-slate-200">
            <AvatarImage src={student.avatarUrl || 'https://via.placeholder.com/150'} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
              {renderStatus(student.status)}
            </div>
            <p className="text-slate-500">
              RA: <span className="font-medium text-slate-700">{student.registrationNumber || '-'}</span> |  
              CPF: <span className="font-medium text-slate-700">{student.cpf || '-'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/alunos/${student.id}/editar`)}>
            <Edit className="h-4 w-4 mr-2" /> Editar
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction(() => studentsService.resetPassword(student.id), "Senha redefinida com sucesso.")}>
            <Key className="h-4 w-4 mr-2" /> Redefinir Senha
          </Button>
          {student.status === 'BLOCKED' ? (
             <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleAction(() => studentsService.activeAccess(student.id), "Acesso ativado.")}>
               <CheckCircle className="h-4 w-4 mr-2" /> Ativar
             </Button>
          ) : (
            <Button variant="destructive" size="sm" onClick={() => handleAction(() => studentsService.blockAccess(student.id), "Acesso bloqueado.")}>
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
              <TabsTrigger value="matriculas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Matrículas</TabsTrigger>
              <TabsTrigger value="notas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Notas</TabsTrigger>
              <TabsTrigger value="frequencia" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Frequência</TabsTrigger>
              <TabsTrigger value="atividades" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Atividades</TabsTrigger>
              <TabsTrigger value="certificados" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Certificados</TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Histórico</TabsTrigger>
              <TabsTrigger value="comunicacao" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Comunicação</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="visaogeral" className="m-0 focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Dados Pessoais</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Nome:</span> {student.name}</p>
                     <p><span className="font-medium text-slate-900">E-mail:</span> {student.email}</p>
                     <p><span className="font-medium text-slate-900">CPF:</span> {student.cpf || '-'}</p>
                     <p><span className="font-medium text-slate-900">Telefone:</span> {student.phone || '-'}</p>
                     <p><span className="font-medium text-slate-900">Data Nasc.:</span> {student.birthDate ? new Date(student.birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}</p>
                     <p><span className="font-medium text-slate-900">Endereço:</span> {student.address || '-'}</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Matrícula Atual</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">RA:</span> {student.registrationNumber || '-'}</p>
                     <p><span className="font-medium text-slate-900">Data de Ingresso:</span> {new Date(student.createdAt).toLocaleDateString('pt-BR')}</p>
                     <p><span className="font-medium text-slate-900">Status:</span> {student.status === 'ACTIVE' ? 'Confirmada' : 'Pendente'}</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Acesso e Sistema</h3>
                   <div className="space-y-2 text-sm text-slate-600">
                     <p><span className="font-medium text-slate-900">Último Login:</span> {student.lastAccessAt ? new Date(student.lastAccessAt).toLocaleString('pt-BR') : 'Nunca acessou'}</p>
                     <p><span className="font-medium text-slate-900">Data de Cadastro:</span> {new Date(student.createdAt).toLocaleDateString('pt-BR')}</p>
                   </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="matriculas" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Nenhuma matrícula complementar encontrada. <Button variant="link" onClick={() => router.push('/admin/matriculas')}>Ir para Matrículas</Button></p>
              </div>
            </TabsContent>

            <TabsContent value="notas" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Nenhuma nota lançada no período vigente.</p>
              </div>
            </TabsContent>

            <TabsContent value="frequencia" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Nenhum registro de falta até o momento.</p>
              </div>
            </TabsContent>

            <TabsContent value="atividades" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>O aluno não realizou nenhuma atividade recente no AVA.</p>
              </div>
            </TabsContent>

            <TabsContent value="certificados" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Aluno sem certificados emitidos.</p>
              </div>
            </TabsContent>

             <TabsContent value="historico" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Histórico completo de auditoria e acesso.</p>
              </div>
            </TabsContent>

             <TabsContent value="comunicacao" className="m-0 focus:outline-none">
              <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed">
                <p>Histórico de notificações e e-mails enviados ao aluno.</p>
                <Button variant="outline" className="mt-4" onClick={() => handleAction(() => studentsService.sendNotification(student.id, "Lembrete", "Mensagem padrao"), "Notificação de teste enviada.")}>
                  <Mail className="w-4 h-4 mr-2" /> Enviar Nova Mensagem
                </Button>
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  );
}
