"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTeachers } from "@/hooks/use-queries";
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

export function AdminTeachers() {
  const router = useRouter();
  const { data: teachers, isLoading, error, refetch } = useTeachers();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredTeachers = teachers?.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.area?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
    { header: "Nome", accessor: (t: Teacher) => (
      <div>
        <p className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => router.push(`/admin/professores/${t.id}`)}>{t.name}</p>
        <p className="text-xs text-slate-500">{t.specialization || 'N/A'}</p>
      </div>
    )},
    { header: "E-mail", accessor: (t: Teacher) => <span className="text-slate-500">{t.email}</span> },
    { header: "Área", accessor: (t: Teacher) => <span className="text-slate-500">{t.area || '-'}</span> },
    { header: "Disciplinas", accessor: () => <span className="text-slate-500">-</span> },
    { header: "Turmas", accessor: () => <span className="text-slate-500">-</span> },
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
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por nome, e-mail ou área..." 
          />
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
