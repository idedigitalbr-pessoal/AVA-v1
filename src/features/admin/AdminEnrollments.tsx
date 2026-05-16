"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEnrollments, useStudents, useCourses, useClasses } from "@/hooks/use-queries";
import { enrollmentService } from "@/lib/api";
import { Enrollment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  AdminPageHeader, 
  AdminSearchInput, 
  AdminCreateButton, 
  AdminFilterBar, 
  AdminEmptyState, 
  AdminLoadingState, 
  AdminDataTable,
  AdminActionMenu
} from "./components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, CheckCircle, XCircle, ArrowRightLeft, User, DollarSign, Eye } from "lucide-react";

export function AdminEnrollments() {
  const router = useRouter();
  const { data: enrollments, isLoading: isEnrLoading, refetch } = useEnrollments();
  const { data: students, isLoading: isStuLoading } = useStudents();
  const { data: courses, isLoading: isCouLoading } = useCourses();
  const { data: classes, isLoading: isClaLoading } = useClasses();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loading = isEnrLoading || isStuLoading || isCouLoading || isClaLoading;

  const studentsMap = students?.reduce((acc, s) => ({ ...acc, [s.id]: s }), {} as Record<string, any>) || {};
  const coursesMap = courses?.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, any>) || {};
  const classesMap = classes?.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, any>) || {};

  const filteredEnrollments = enrollments?.filter(enr => {
    const studentName = studentsMap[enr.userId]?.name || '';
    const regNumber = studentsMap[enr.userId]?.registrationNumber || '';
    const courseTitle = coursesMap[enr.courseId]?.title || '';

    const matchesSearch = studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter) {
      matchesStatus = enr.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  }) || [];

  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      await action();
      toast.success(successMsg);
      refetch();
    } catch {
      toast.error("Ocorreu um erro ao executar a ação.");
    }
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

  const renderActionMenu = (enr: Enrollment) => (
    <div className="flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <span className="sr-only">Abrir menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => router.push(`/admin/matriculas/${enr.id}`)}>
            <Eye className="mr-2 h-4 w-4" /> Visualizar matrícula
          </DropdownMenuItem>
          {enr.status === 'PENDING' && (
            <DropdownMenuItem onClick={() => handleAction(() => enrollmentService.confirmEnrollment(enr.id), "Matrícula confirmada.")}>
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" /> Confirmar matrícula
            </DropdownMenuItem>
          )}
          {['PENDING', 'CONFIRMED', 'LOCKED'].includes(enr.status) && (
            <DropdownMenuItem onClick={() => handleAction(() => enrollmentService.cancelEnrollment(enr.id), "Matrícula cancelada.")}>
              <XCircle className="mr-2 h-4 w-4 text-red-600" /> Cancelar matrícula
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => toast.info("Funcionalidade de transferência em breve")}>
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Transferir turma
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toast.info("Perfil do aluno em breve")}>
            <User className="mr-2 h-4 w-4" /> Acessar perfil do aluno
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info("Financeiro em breve")}>
            <DollarSign className="mr-2 h-4 w-4" /> Acessar financeiro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info("Impersonar aluno em breve")}>
            <Eye className="mr-2 h-4 w-4" /> Impersonar aluno
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { header: "Aluno", accessor: (enr: Enrollment) => (
      <div>
        <p className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => router.push(`/admin/matriculas/${enr.id}`)}>
          {studentsMap[enr.userId]?.name || 'Aluno Desconhecido'}
        </p>
        <p className="text-xs text-slate-500">{studentsMap[enr.userId]?.registrationNumber || '-'}</p>
      </div>
    ) },
    { header: "Curso", accessor: (enr: Enrollment) => <span className="text-slate-500 line-clamp-1 max-w-[180px]">{coursesMap[enr.courseId]?.title || '-'}</span> },
    { header: "Turma", accessor: (enr: Enrollment) => <span className="text-slate-500">{enr.classId ? classesMap[enr.classId]?.name || '-' : '-'}</span> },
    { header: "Situação Acadêmica", accessor: (enr: Enrollment) => <span className="text-slate-500">{enr.academicSituation || '-'}</span> },
    { header: "Data", accessor: (enr: Enrollment) => <span className="text-slate-500">{new Date(enr.enrolledAt).toLocaleDateString('pt-BR')}</span> },
    { header: "Status", accessor: (enr: Enrollment) => renderStatus(enr.status) },
    { header: "Ações", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Matrículas" 
        description="Gerencie as matrículas de alunos em cursos e turmas." 
        action={
          <AdminCreateButton 
            label="Nova Matrícula" 
            onClick={() => router.push('/admin/matriculas/nova')} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <AdminFilterBar>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <AdminSearchInput 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Buscar por aluno, RA ou curso..." 
            />
            <select 
               className="border border-slate-200 rounded-md text-sm px-3 py-2 bg-white w-full sm:w-auto sm:max-w-[200px] outline-none focus:ring-2 focus:ring-indigo-500"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
            >
               <option value="">Status: Todos</option>
               <option value="PENDING">Pendente</option>
               <option value="CONFIRMED">Confirmada</option>
               <option value="LOCKED">Trancada</option>
               <option value="CANCELED">Cancelada</option>
               <option value="COMPLETED">Concluída</option>
            </select>
          </div>
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando matrículas..." />
        ) : filteredEnrollments.length === 0 ? (
          <AdminEmptyState 
            title="Nenhuma matrícula encontrada"
            description="Você ainda não cadastrou nenhuma matrícula ou a busca não retornou resultados."
            action={
              <AdminCreateButton 
                label="Nova Matrícula" 
                onClick={() => router.push('/admin/matriculas/nova')} 
              />
            }
          />
        ) : (
          <AdminDataTable 
            data={filteredEnrollments}
            columns={columns}
            keyExtractor={(enr) => enr.id}
            renderMobileCard={(enr) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div onClick={() => router.push(`/admin/matriculas/${enr.id}`)} className="cursor-pointer">
                    <p className="font-bold text-slate-900 text-sm">{studentsMap[enr.userId]?.name || 'Desconhecido'}</p>
                    <p className="text-xs text-slate-500">{coursesMap[enr.courseId]?.title || '-'}</p>
                  </div>
                  <div>
                    {renderStatus(enr.status)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center">Turma: {enr.classId ? classesMap[enr.classId]?.name || '-' : '-'}</span>
                  <span className="flex items-center">Data: {new Date(enr.enrolledAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 mt-2">
                  {renderActionMenu(enr)}
                </div>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
