"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useStudents } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Student } from "@/types";
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

export function AdminStudents() {
  const { data: students, isLoading, error, refetch } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredStudents = students?.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderActionMenu = (s: Student) => (
    <div className="flex justify-end items-center gap-1">
      <Can I="MANAGE_USERS">
        <AdminActionMenu 
          onEdit={() => toast.success(`Editar aluno ${s.name}`)}
        />
      </Can>
      <Can I="DELETE_USERS">
        <AdminConfirmDialog
          title="Excluir aluno"
          description={`Deseja excluir o aluno ${s.name}?`}
          onConfirm={() => toast.success(`Aluno ${s.name} excluído.`)}
        >
          <span>
            <AdminActionMenu onDelete={() => {}} />
          </span>
        </AdminConfirmDialog>
      </Can>
    </div>
  );

  const columns = [
    { header: "Nome", accessor: (s: Student) => <span className="font-medium text-slate-900">{s.name}</span> },
    { header: "E-mail", accessor: (s: Student) => <span className="text-slate-500">{s.email}</span> },
    { header: "Status", accessor: (s: Student) => <AdminStatusBadge status="Ativo" variant="success" /> },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Alunos" 
        description="Gerencie os alunos da instituição." 
        action={
          <AdminCreateButton 
            label="Novo Aluno" 
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
            placeholder="Buscar por nome ou e-mail..." 
          />
        </AdminFilterBar>

        {isLoading ? (
          <AdminLoadingState text="Carregando alunos..." />
        ) : filteredStudents.length === 0 ? (
          <AdminEmptyState 
            title="Nenhum aluno encontrado"
            description="Você ainda não cadastrou nenhum aluno ou a busca não retornou resultados."
          />
        ) : (
          <AdminDataTable 
            data={filteredStudents}
            columns={columns}
            keyExtractor={(s) => s.id}
            renderMobileCard={(s) => (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{s.email}</p>
                  </div>
                  <AdminStatusBadge status="Ativo" variant="success" />
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
