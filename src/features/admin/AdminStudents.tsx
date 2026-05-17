"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStudents, useEnrollments, useCourses, useClasses } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Student, Enrollment } from "@/types";
import { 
  AdminPageHeader, 
  AdminSearchInput, 
  AdminCreateButton, 
  AdminFilterBar, 
  AdminStatusBadge, 
  AdminEmptyState, 
  AdminLoadingState, 
  AdminDataTable 
} from "./components";
import { Can } from "@/lib/auth/Can";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Key, Bell, Eye, Ban, CheckCircle, Clock } from "lucide-react";
import { studentsService } from "@/lib/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminStudents() {
  const router = useRouter();
  const { data: students, isLoading: isStuLoading, error, refetch } = useStudents();
  const { data: enrollments } = useEnrollments();
  const { data: courses } = useCourses();
  const { data: classes } = useClasses();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [courseFilter, setCourseFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const loading = isStuLoading;

  const coursesMap = courses?.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, any>) || {};
  const classesMap = classes?.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, any>) || {};

  const getStudentCurrentEnrollment = (studentId: string): Enrollment | undefined => {
    return enrollments?.find(e => e.userId === studentId && ['ACTIVE', 'CONFIRMED', 'PENDING'].includes(e.status));
  };

  const filteredStudents = students?.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.cpf?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    
    const enr = getStudentCurrentEnrollment(s.id);
    const matchesCourse = courseFilter === "ALL" || (enr && enr.courseId === courseFilter);
    const matchesClass = classFilter === "ALL" || (enr && enr.classId === classFilter);

    return matchesSearch && matchesStatus && matchesCourse && matchesClass;
  }) || [];

  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      await action();
      toast.success(successMsg);
      refetch();
    } catch {
      toast.error("Erro ao executar ação.");
    }
  };

  const renderStatus = (s: Student) => {
    if (s.status === 'BLOCKED') return <AdminStatusBadge status="Bloqueado" variant="destructive" />;
    if (s.status === 'INACTIVE') return <AdminStatusBadge status="Inativo" variant="warning" />;
    return <AdminStatusBadge status="Ativo" variant="success" />;
  };

  const renderActionMenu = (s: Student) => (
    <div className="flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <span className="sr-only">Abrir menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => router.push(`/admin/alunos/${s.id}`)}>
            <Eye className="mr-2 h-4 w-4" /> Visualizar perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/admin/alunos/${s.id}/editar`)}>
            <Edit className="mr-2 h-4 w-4" /> Editar aluno
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction(() => studentsService.resetPassword(s.id), "Senha redefinida.")}>
            <Key className="mr-2 h-4 w-4" /> Redefinir senha
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction(() => studentsService.sendNotification(s.id, "Aviso", "Sua notificação"), "Notificação enviada.")}>
            <Bell className="mr-2 h-4 w-4" /> Enviar notificação
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleAction(() => studentsService.impersonateStudent(s.id), "Redirecionando como " + s.name + "...")}>
            <Eye className="mr-2 h-4 w-4" /> Impersonar aluno
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />

          {s.status === 'BLOCKED' ? (
            <DropdownMenuItem onClick={() => handleAction(() => studentsService.activeAccess(s.id), "Acesso ativado.")}>
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" /> Ativar acesso
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleAction(() => studentsService.blockAccess(s.id), "Acesso bloqueado.")}>
              <Ban className="mr-2 h-4 w-4 text-red-600" /> Bloquear acesso
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { header: "Nome / RA", accessor: (s: Student) => (
      <div>
        <p className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => router.push(`/admin/alunos/${s.id}`)}>{s.name}</p>
        <p className="text-xs text-slate-500">{s.registrationNumber || '-'}</p>
      </div>
    ) },
    { header: "CPF", accessor: (s: Student) => <span className="text-slate-500">{s.cpf || '-'}</span> },
    { header: "E-mail", accessor: (s: Student) => <span className="text-slate-500">{s.email}</span> },
    { header: "Curso Atual", accessor: (s: Student) => {
      const enr = getStudentCurrentEnrollment(s.id);
      return <span className="text-slate-500 text-sm line-clamp-1 max-w-[150px]">{enr ? coursesMap[enr.courseId]?.title : '-'}</span>;
    } },
    { header: "Turma", accessor: (s: Student) => {
      const enr = getStudentCurrentEnrollment(s.id);
      return <span className="text-slate-500 text-sm">{enr && enr.classId ? classesMap[enr.classId]?.name : '-'}</span>;
    } },
    { header: "Último Acesso", accessor: (s: Student) => (
      <div className="flex items-center text-slate-500 text-sm">
        <Clock className="w-3 h-3 mr-1" />
        {s.lastAccessAt ? new Date(s.lastAccessAt).toLocaleDateString('pt-BR') : '-'}
      </div>
    ) },
    { header: "Status", accessor: (s: Student) => renderStatus(s) },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Alunos" 
        description="Gestão completa de alunos da instituição." 
        action={
          <Can I="MANAGE_USERS">
            <AdminCreateButton 
              label="Novo Aluno" 
              onClick={() => router.push("/admin/alunos/novo")} 
            />
          </Can>
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <AdminFilterBar>
          <div className="flex-1 min-w-[200px]">
            <AdminSearchInput 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Buscar por nome, RA, CPF ou e-mail..." 
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || '')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos Status</SelectItem>
              <SelectItem value="ACTIVE">Ativo</SelectItem>
              <SelectItem value="INACTIVE">Inativo</SelectItem>
              <SelectItem value="BLOCKED">Bloqueado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={courseFilter} onValueChange={(val) => setCourseFilter(val || '')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os Cursos</SelectItem>
              {courses?.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={(val) => setClassFilter(val || '')} disabled={courseFilter === "ALL"}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas as Turmas</SelectItem>
              {classes?.filter(c => c.courseId === courseFilter).map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando alunos..." />
        ) : filteredStudents.length === 0 ? (
          <AdminEmptyState 
            title="Nenhum aluno encontrado"
            description="Você ainda não cadastrou nenhum aluno ou a busca não retornou resultados."
            action={
              <AdminCreateButton label="Novo Aluno" onClick={() => router.push("/admin/alunos/novo")} />
            }
          />
        ) : (
          <AdminDataTable 
            data={filteredStudents}
            columns={columns}
            keyExtractor={(s) => s.id}
            renderMobileCard={(s) => {
              const enr = getStudentCurrentEnrollment(s.id);
              return (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div onClick={() => router.push(`/admin/alunos/${s.id}`)} className="cursor-pointer">
                      <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{s.registrationNumber} • {s.cpf || '-'}</p>
                    </div>
                    {renderStatus(s)}
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>{s.email}</span>
                    <span>Curso: {enr ? coursesMap[enr.courseId]?.title : '-'}</span>
                    <span>Turma: {enr && enr.classId ? classesMap[enr.classId]?.name : '-'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-end mt-2">
                    {renderActionMenu(s)}
                  </div>
                </>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
