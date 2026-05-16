"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCourses } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Course } from "@/types";
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
import { Can } from "@/lib/auth/Can";

export function AdminCourses() {
  const { data: courses, isLoading, error, refetch } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredCourses = courses?.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderActionMenu = (c: Course) => (
    <div className="flex justify-end items-center gap-1">
      <Can I="MANAGE_COURSES">
        <AdminActionMenu 
          onEdit={() => toast.success(`Editar curso ${c.title}`)}
        />
      </Can>
      <Can I="DELETE_COURSES">
        <AdminConfirmDialog
          title="Excluir curso"
          description={`Deseja excluir o curso ${c.title}?`}
          onConfirm={() => toast.success(`Curso ${c.title} excluído.`)}
        >
          <span>
            <AdminActionMenu onDelete={() => {}} />
          </span>
        </AdminConfirmDialog>
      </Can>
    </div>
  );

  const columns = [
    { header: "Nome do Curso", accessor: (c: Course) => <span className="font-bold text-slate-700">{c.title}</span> },
    { header: "Descrição", accessor: (c: Course) => <span className="text-slate-500 max-w-xs truncate block">{c.description}</span> },
    { header: "Total Módulos", accessor: (c: Course) => <span className="text-slate-500">{c.totalModules}</span> },
    { header: "Total Alunos", accessor: (c: Course) => <span className="text-slate-500">{c.totalStudents}</span> },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Cursos" 
        description="Gerencie os cursos de graduação e pós oferecidos." 
        action={
          <AdminCreateButton 
            label="Novo Curso" 
            permission="MANAGE_COURSES" 
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
          <AdminLoadingState text="Carregando cursos..." />
        ) : filteredCourses.length === 0 ? (
          <AdminEmptyState 
            title="Nenhum curso encontrado"
            description="Você ainda não cadastrou nenhum curso ou a busca não retornou resultados."
          />
        ) : (
          <AdminDataTable 
            data={filteredCourses}
            columns={columns}
            keyExtractor={(c) => c.id}
            renderMobileCard={(c) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-slate-900">{c.title}</p>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{c.description}</p>
                <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>{c.totalModules} Módulos</span>
                  <span>{c.totalStudents} Alunos</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  {renderActionMenu(c)}
                </div>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
