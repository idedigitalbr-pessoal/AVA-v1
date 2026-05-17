"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { enrollmentService } from "@/lib/api";
import { useStudents, useCourses, useClasses } from "@/hooks/use-queries";
import { Enrollment } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Settings, User, Lock, ArrowRightLeft, MoreVertical } from "lucide-react";
import { AdminLoadingState, AdminEmptyState } from "../components";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminEnrollmentDetailsProps {
  enrollmentId: string;
}

export function AdminEnrollmentDetails({ enrollmentId }: AdminEnrollmentDetailsProps) {
  const router = useRouter();
  const [enr, setEnr] = useState<Enrollment | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const { data: students } = useStudents();
  const { data: courses } = useCourses();
  const { data: classes } = useClasses();

  useEffect(() => {
    async function load() {
      try {
        const data = await enrollmentService.getEnrollmentById(enrollmentId);
        if (data) setEnr(data);
        else {
          toast.error("Matrícula não encontrada");
          router.push('/admin/matriculas');
        }
      } catch {
        toast.error("Erro ao carregar matrícula");
      } finally {
        setLoadingConfig(false);
      }
    }
    load();
  }, [enrollmentId, router]);

  const handleConfirm = async () => {
    if (!enr) return;
    try {
      const data = await enrollmentService.confirmEnrollment(enr.id);
      setEnr(data);
      toast.success("Matrícula confirmada");
    } catch {
      toast.error("Erro");
    }
  };

  const handleCancel = async () => {
    if (!enr) return;
    try {
      const data = await enrollmentService.cancelEnrollment(enr.id);
      setEnr(data);
      toast.success("Matrícula cancelada");
    } catch {
      toast.error("Erro");
    }
  };

  const handleLock = async () => {
    if (!enr) return;
    try {
      // Mocking trancar
      setEnr({ ...enr, status: 'LOCKED' });
      toast.success("Matrícula trancada temporariamente");
    } catch {
      toast.error("Erro");
    }
  };

  const handleTransfer = async () => {
    toast.success("Funcionalidade de transferência de turma será aberta em breve.");
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">Confirmada</Badge>;
      case 'PENDING':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-none">Pendente</Badge>;
      case 'LOCKED':
        return <Badge variant="outline" className="bg-slate-50 text-slate-600 border-none">Trancada</Badge>;
      case 'CANCELED':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-none">Cancelada</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-none">Concluída</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loadingConfig) return <AdminLoadingState text="Carregando detalhes..." />;
  if (!enr) return <AdminEmptyState title="Matrícula não encontrada" />;

  const student = students?.find(s => s.id === enr.userId);
  const course = courses?.find(c => c.id === enr.courseId);
  const classItem = classes?.find(c => c.id === enr.classId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/matriculas')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Matrícula #{enr.id.split('-').pop()}</h1>
            {renderStatus(enr.status)}
          </div>
          <p className="text-slate-500">Cadastrada em {new Date(enr.enrolledAt).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="flex gap-2">
          {enr.status === 'PENDING' && (
            <Button onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="h-4 w-4 mr-2" /> Confirmar
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 h-9 px-4 py-2">
              <Settings className="h-4 w-4" /> Gerenciar
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleTransfer}>
                <ArrowRightLeft className="mr-2 h-4 w-4" /> Transferir Turma
              </DropdownMenuItem>
              {['PENDING', 'CONFIRMED'].includes(enr.status) && (
                <DropdownMenuItem onClick={handleLock}>
                  <Lock className="mr-2 h-4 w-4" /> Trancar Matrícula
                </DropdownMenuItem>
              )}
              {['PENDING', 'CONFIRMED', 'LOCKED'].includes(enr.status) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleCancel} className="text-red-600 focus:text-red-600">
                    <XCircle className="mr-2 h-4 w-4" /> Cancelar Matrícula
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-semibold mb-4 border-b border-slate-100 pb-2">
            <User className="h-5 w-5 text-indigo-600" />
            Dados do Aluno
          </div>
          <div className="space-y-2">
            <p><span className="text-slate-500 font-medium">Nome:</span> {student?.name || '---'}</p>
            <p><span className="text-slate-500 font-medium">Email:</span> {student?.email || '---'}</p>
            <p><span className="text-slate-500 font-medium">RA:</span> {student?.registrationNumber || '---'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Settings className="h-5 w-5 text-indigo-600" />
            Vínculo Acadêmico
          </div>
          <div className="space-y-2">
            <p><span className="text-slate-500 font-medium">Curso:</span> {course?.title || '---'}</p>
            <p><span className="text-slate-500 font-medium">Turma:</span> {classItem?.name || 'Sem turma'}</p>
            <p><span className="text-slate-500 font-medium">Progresso:</span> {enr.progress}%</p>
            <p><span className="text-slate-500 font-medium">Situação:</span> {enr.academicSituation || 'Nenhuma'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
