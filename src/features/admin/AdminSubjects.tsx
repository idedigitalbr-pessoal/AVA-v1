"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSubjects } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Subject } from "@/types";
import { 
  AdminPageHeader, 
  AdminSearchInput, 
  AdminCreateButton, 
  AdminFilterBar, 
  AdminActionMenu, 
  AdminConfirmDialog, 
  AdminEmptyState, 
  AdminLoadingState, 
  AdminDataTable 
} from "./components";

export function AdminSubjects() {
  const { data: subjects, isLoading, error, refetch } = useSubjects();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredSubjects = subjects?.filter(s => 
    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderActionMenu = (subject: Subject) => (
    <div className="flex justify-end items-center gap-1">
      <AdminActionMenu 
        onEdit={() => toast.success(`Editar disciplina ${subject.name}`)}
      />
      <AdminConfirmDialog
        title="Excluir disciplina"
        description={`Deseja excluir a disciplina ${subject.name}?`}
        onConfirm={() => toast.success(`Disciplina ${subject.name} excluída.`)}
      >
        <span>
          <AdminActionMenu onDelete={() => {}} />
        </span>
      </AdminConfirmDialog>
    </div>
  );

  const columns = [
    { header: "Código", accessor: (s: Subject) => <span className="font-bold text-slate-700">{s.code}</span> },
    { header: "Nome", accessor: (s: Subject) => <span className="font-medium text-slate-900">{s.name}</span> },
    { header: "Carga Horária", accessor: (s: Subject) => <span className="text-slate-500">{s.workload}h</span> },
    { header: "Descrição", accessor: (s: Subject) => <span className="text-slate-500 max-w-xs truncate block">{s.description || 'N/A'}</span> },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Disciplinas" 
        description="Gerencie o catálogo de disciplinas." 
        action={
          <AdminCreateButton 
            label="Nova Disciplina" 
            onClick={() => toast.success("Iniciando cadastro...")} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por código ou nome..." 
          />
        </AdminFilterBar>

        {isLoading ? (
          <AdminLoadingState text="Carregando disciplinas..." />
        ) : filteredSubjects.length === 0 ? (
          <AdminEmptyState 
            title="Nenhuma disciplina encontrada"
            description="Você ainda não cadastrou nenhuma disciplina ou a busca não retornou resultados."
          />
        ) : (
          <AdminDataTable 
            data={filteredSubjects}
            columns={columns}
            keyExtractor={(s) => s.id}
            renderMobileCard={(s) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-slate-900">{s.code} - {s.name}</p>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{s.description || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center">Carga Horária: {s.workload}h</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  {renderActionMenu(s)}
                </div>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
