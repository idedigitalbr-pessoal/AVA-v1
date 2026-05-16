"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSubjects } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Subject } from "@/types";
import { Badge } from "@/components/ui/badge";
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
import { subjectsService } from "@/lib/api";

export function AdminSubjects() {
  const router = useRouter();
  const { data: subjects, isLoading, error, refetch } = useSubjects();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredSubjects = subjects?.filter(s => 
    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.area?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderStatus = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">Ativa</Badge>;
      case 'ARCHIVED':
        return <Badge variant="outline" className="text-slate-400 border-slate-200">Arquivada</Badge>;
      case 'DRAFT':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-none">Rascunho</Badge>;
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await subjectsService.updateSubject(id, { status: 'ARCHIVED' });
      toast.success("Disciplina arquivada.");
      refetch();
    } catch {
      toast.error("Erro ao arquivar disciplina.");
    }
  };

  const renderActionMenu = (subject: Subject) => (
    <div className="flex justify-end items-center gap-1">
      <AdminActionMenu 
        onView={() => router.push(`/admin/disciplinas/${subject.id}`)}
        onEdit={() => router.push(`/admin/disciplinas/${subject.id}/editar`)}
      />
      <AdminConfirmDialog
        title="Arquivar disciplina"
        description={`Deseja arquivar a disciplina ${subject.code} - ${subject.name}?`}
        onConfirm={() => handleArchive(subject.id)}
      >
        <span>
          <AdminActionMenu onDelete={() => {}} />
        </span>
      </AdminConfirmDialog>
    </div>
  );

  const columns = [
    { header: "Código", accessor: (s: Subject) => <span className="font-bold text-slate-700">{s.code}</span> },
    { header: "Nome", accessor: (s: Subject) => (
      <span className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => router.push(`/admin/disciplinas/${s.id}`)}>
        {s.name}
      </span>
    ) },
    { header: "CH", accessor: (s: Subject) => <span className="text-slate-500">{s.workload}h</span> },
    { header: "Área", accessor: (s: Subject) => <span className="text-slate-500">{s.area || '-'}</span> },
    { header: "Cursos", accessor: (s: Subject) => <span className="text-slate-500">{s.linkedCourses?.length || 0} cursos</span> },
    { header: "Professores", accessor: (s: Subject) => <span className="text-slate-500">{s.linkedTeachers?.length || 0} prof.</span> },
    { header: "Status", accessor: (s: Subject) => renderStatus(s.status) },
    { header: "Ações", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Disciplinas" 
        description="Gerencie o catálogo de disciplinas." 
        action={
          <AdminCreateButton 
            label="Nova Disciplina" 
            onClick={() => router.push("/admin/disciplinas/novo")} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por código, nome ou área..." 
          />
        </AdminFilterBar>

        {isLoading ? (
          <AdminLoadingState text="Carregando disciplinas..." />
        ) : filteredSubjects.length === 0 ? (
          <AdminEmptyState 
            title="Nenhuma disciplina encontrada"
            description="Você ainda não cadastrou nenhuma disciplina ou a busca não retornou resultados."
            action={
              <AdminCreateButton 
                label="Criar Disciplina" 
                onClick={() => router.push("/admin/disciplinas/novo")} 
              />
            }
          />
        ) : (
          <AdminDataTable 
            data={filteredSubjects}
            columns={columns}
            keyExtractor={(s) => s.id}
            renderMobileCard={(s) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div onClick={() => router.push(`/admin/disciplinas/${s.id}`)} className="cursor-pointer">
                    <p className="font-bold text-slate-900">{s.code} - {s.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{s.area || 'Sem área'}</p>
                  </div>
                  <div>
                    {renderStatus(s.status)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center">Carga Horária: {s.workload}h</span>
                  <span className="flex items-center">Cursos: {s.linkedCourses?.length || 0}</span>
                  <span className="flex items-center">Professores: {s.linkedTeachers?.length || 0}</span>
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
