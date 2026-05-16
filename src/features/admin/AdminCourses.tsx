"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
        <button 
          onClick={() => router.push(`/admin/cursos/${c.id}`)}
          className="text-xs text-blue-600 hover:underline mr-3 font-medium"
        >
          Detalhes
        </button>
        <AdminActionMenu 
          onEdit={() => router.push(`/admin/cursos/${c.id}/editar`)}
        />
      </Can>
      <Can I="DELETE_COURSES">
        <AdminConfirmDialog
          title="Excluir curso"
          description={`Deseja excluir o curso ${c.title}? Esta ação não pode ser desfeita.`}
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
    { 
      header: "Código", 
      accessor: (c: Course) => <span className="text-slate-500 font-mono text-xs">{c.code}</span> 
    },
    { 
      header: "Nome do Curso", 
      accessor: (c: Course) => (
        <div>
          <span className="font-bold text-slate-700 block">{c.title}</span>
          <span className="text-xs text-slate-500">{c.degree} • {c.modality}</span>
        </div>
      ) 
    },
    { 
      header: "Carga Horária", 
      accessor: (c: Course) => <span className="text-slate-500">{c.workload}h</span> 
    },
    { 
      header: "Coordenador", 
      accessor: (c: Course) => <span className="text-slate-600">{c.coordinatorName || '-'}</span> 
    },
    { 
      header: "Turmas / Alunos", 
      accessor: (c: Course) => (
        <div className="flex flex-col text-sm">
          <span className="text-slate-600">{c.totalClasses} turmas</span>
          <span className="text-slate-500 text-xs">{c.totalStudents} alunos</span>
        </div>
      ) 
    },
    { 
      header: "Status", 
      accessor: (c: Course) => {
        let bg = "bg-slate-100 text-slate-600";
        let label = "Rascunho";
        
        if (c.status === "PUBLISHED") {
          bg = "bg-emerald-100 text-emerald-800";
          label = "Publicado";
        } else if (c.status === "ARCHIVED") {
          bg = "bg-rose-100 text-rose-800";
          label = "Arquivado";
        }

        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${bg}`}>{label}</span>;
      }
    },
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
            onClick={() => router.push('/admin/cursos/novo')} 
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
                  <div>
                    <span className="text-xs font-mono text-slate-500 block">{c.code}</span>
                    <p className="font-bold text-slate-900">{c.title}</p>
                    <span className="text-xs text-slate-500">{c.degree} • {c.modality}</span>
                  </div>
                  <div>
                  {c.status === "PUBLISHED" ? (
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 text-xs font-medium rounded-full">Publicado</span>
                  ) : c.status === "ARCHIVED" ? (
                    <span className="bg-rose-100 text-rose-800 px-2 py-1 text-xs font-medium rounded-full">Arquivado</span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 text-xs font-medium rounded-full">Rascunho</span>
                  )}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                  <span>{c.totalClasses} Turmas</span>
                  <span>{c.workload}h</span>
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
