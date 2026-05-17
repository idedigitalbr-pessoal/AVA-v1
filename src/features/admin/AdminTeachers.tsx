"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTeachers, useCourses, useSubjects, useClasses } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Teacher } from "@/types";
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
import { MoreVertical, Edit, Key, Eye, Ban, CheckCircle, Clock, BookOpen, Users } from "lucide-react";
import { teachersService } from "@/lib/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminTeachers() {
  const router = useRouter();
  const { data: teachers, isLoading, error, refetch } = useTeachers();
  const { data: courses } = useCourses();
  const { data: subjects } = useSubjects();
  const { data: classes } = useClasses();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [courseFilter, setCourseFilter] = useState("ALL");
  const [subjectFilter, setSubjectFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredTeachers = teachers?.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.area?.toLowerCase().includes(searchTerm.toLowerCase());
          
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    
    // Simplificado por hora pois precisaria do mock de ClassSubject no client para os filtros avançados
    // O backend real cuidaria melhor desse filtro relacional
    return matchesSearch && matchesStatus;
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

  const renderStatus = (s: Teacher) => {
    if (s.status === 'BLOCKED') return <AdminStatusBadge status="Bloqueado" variant="destructive" />;
    if (s.status === 'INACTIVE') return <AdminStatusBadge status="Inativo" variant="warning" />;
    return <AdminStatusBadge status="Ativo" variant="success" />;
  };

  const renderActionMenu = (t: Teacher) => (
    <div className="flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <span className="sr-only">Abrir menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => router.push(`/admin/professores/${t.id}`)}>
            <Eye className="mr-2 h-4 w-4" /> Visualizar perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/admin/professores/${t.id}/editar`)}>
            <Edit className="mr-2 h-4 w-4" /> Editar professor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction(() => teachersService.resetPassword(t.id), "Senha redefinida.")}>
            <Key className="mr-2 h-4 w-4" /> Redefinir senha
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => toast.success(`Vinculando disciplina para ${t.name}...`)}>
            <BookOpen className="mr-2 h-4 w-4" /> Vincular disciplina
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => toast.success(`Vinculando turma para ${t.name}...`)}>
            <Users className="mr-2 h-4 w-4" /> Vincular turma
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => toast.info("Impersonando " + t.name)}>
            <Eye className="mr-2 h-4 w-4" /> Impersonar visualmente
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />

          {t.status === 'BLOCKED' ? (
            <DropdownMenuItem onClick={() => handleAction(() => teachersService.activeAccess(t.id), "Acesso ativado.")}>
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" /> Ativar acesso
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleAction(() => teachersService.blockAccess(t.id), "Acesso bloqueado.")}>
              <Ban className="mr-2 h-4 w-4 text-red-600" /> Bloquear acesso
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { header: "Nome / Matrícula", accessor: (t: any) => (
      <div>
        <p className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => router.push(`/admin/professores/${t.id}`)}>{t.name}</p>
        <p className="text-xs text-slate-500">{t.cpf ? `CPF: ${t.cpf}` : (t.specialization || 'N/A')}</p>
      </div>
    )},
    { header: "E-mail", accessor: (t: Teacher) => <span className="text-slate-500">{t.email}</span> },
    { header: "Área", accessor: (t: Teacher) => <span className="text-slate-500">{t.area || '-'}</span> },
    { header: "Disciplinas", accessor: (t: any) => <span className="text-slate-500">{t.subjectsCount || 0}</span> },
    { header: "Turmas", accessor: (t: any) => <span className="text-slate-500">{t.classesCount || 0}</span> },
    { header: "Carga Horária", accessor: (t: any) => <span className="text-slate-500">{t.workload ? `${t.workload}h` : '-'}</span> },
    { header: "Último Acesso", accessor: (t: Teacher) => (
      <div className="flex items-center text-slate-500 text-sm">
        <Clock className="w-3 h-3 mr-1" />
        {t.lastAccessAt ? new Date(t.lastAccessAt).toLocaleDateString('pt-BR') : '-'}
      </div>
    ) },
    { header: "Status", accessor: (t: Teacher) => renderStatus(t) },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Professores" 
        description="Gestão completa do corpo docente." 
        action={
          <Can I="MANAGE_USERS">
            <AdminCreateButton 
              label="Novo Professor" 
              onClick={() => router.push("/admin/professores/novo")} 
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
              placeholder="Buscar por nome, e-mail, CPF ou área..." 
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
          <Select value={subjectFilter} onValueChange={(val) => setSubjectFilter(val || '')}>
            <SelectTrigger className="w-[180px] hidden lg:flex">
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas Disciplinas</SelectItem>
              {subjects?.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={(val) => setClassFilter(val || '')}>
            <SelectTrigger className="w-[180px] hidden xl:flex">
              <SelectValue placeholder="Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas as Turmas</SelectItem>
              {classes?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </AdminFilterBar>

        {isLoading ? (
          <AdminLoadingState text="Carregando professores..." />
        ) : filteredTeachers.length === 0 ? (
          <AdminEmptyState 
            title="Nenhum professor encontrado"
            description="Você ainda não cadastrou nenhum professor ou a busca não retornou resultados."
            action={
              <AdminCreateButton label="Novo Professor" onClick={() => router.push("/admin/professores/novo")} />
            }
          />
        ) : (
          <AdminDataTable 
            data={filteredTeachers}
            columns={columns}
            keyExtractor={(t) => t.id}
            renderMobileCard={(t) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div onClick={() => router.push(`/admin/professores/${t.id}`)} className="cursor-pointer">
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{t.area || '-'}</p>
                  </div>
                  {renderStatus(t)}
                </div>
                <div className="flex flex-col gap-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>{t.email}</span>
                  <span>Especialização: {t.specialization || '-'}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-end mt-2">
                  {renderActionMenu(t)}
                </div>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
