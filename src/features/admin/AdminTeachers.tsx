"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTeachers } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Teacher } from "@/types";
import { 
  AdminPageHeader, 
  AdminSearchInput, 
  AdminCreateButton, 
  AdminFilterBar, 
  AdminStatusBadge, 
  AdminActionMenu, 
  AdminConfirmDialog, 
  AdminEmptyState, 
  AdminLoadingState, 
  AdminDataTable 
} from "./components";
import { Can } from "@/lib/auth/Can";

export function AdminTeachers() {
  const { data: teachers, isLoading, error, refetch } = useTeachers();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredTeachers = teachers?.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderActionMenu = (t: Teacher) => (
    <div className="flex justify-end items-center gap-1">
      <Can I="MANAGE_USERS">
        <AdminActionMenu 
          onEdit={() => toast.success(`Editar professor ${t.name}`)}
        />
      </Can>
      <Can I="DELETE_USERS">
        <AdminConfirmDialog
          title="Excluir professor"
          description={`Deseja excluir o professor ${t.name}?`}
          onConfirm={() => toast.success(`Professor ${t.name} excluído.`)}
        >
          <span>
            <AdminActionMenu onDelete={() => {}} />
          </span>
        </AdminConfirmDialog>
      </Can>
    </div>
  );

  const columns = [
    { header: "Nome", accessor: (t: Teacher) => <span className="font-medium text-slate-900">{t.name}</span> },
    { header: "E-mail", accessor: (t: Teacher) => <span className="text-slate-500">{t.email}</span> },
    { header: "Departamento", accessor: (t: Teacher) => <span className="text-slate-500">{t.specialization || 'N/A'}</span> },
    { header: "Status", accessor: (t: Teacher) => <AdminStatusBadge status="Ativo" variant="success" /> },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Professores" 
        description="Gerencie o corpo docente da instituição." 
        action={
          <AdminCreateButton 
            label="Novo Professor" 
            permission="MANAGE_USERS" 
            onClick={() => toast.success("Iniciando cadastro...")} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por nome ou departamento..." 
          />
        </AdminFilterBar>

        {isLoading ? (
          <AdminLoadingState text="Carregando professores..." />
        ) : filteredTeachers.length === 0 ? (
          <AdminEmptyState 
            title="Nenhum professor encontrado"
            description="Você ainda não cadastrou nenhum professor ou a busca não retornou resultados."
          />
        ) : (
          <AdminDataTable 
            data={filteredTeachers}
            columns={columns}
            keyExtractor={(t) => t.id}
            renderMobileCard={(t) => (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{t.specialization || 'N/A'}</p>
                  </div>
                  <AdminStatusBadge status="Ativo" variant="success" />
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
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
