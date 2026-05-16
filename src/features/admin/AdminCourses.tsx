"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCourses } from "@/hooks/use-queries";
import { coursesService } from "@/lib/api";
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
  AdminDataTable,
  AdminStatusBadge
} from "./components";
import { Can } from "@/lib/auth/Can";
import { Badge } from "@/components/ui/badge";

export function AdminCourses() {
  const router = useRouter();
  const { data: courses, isLoading, error, refetch } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredCourses = courses?.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id: string) => {
    try {
      await coursesService.deleteCourse(id);
      toast.success("Curso excluído com sucesso.");
      refetch();
    } catch (e) {
      toast.error("Erro ao excluir curso.");
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await coursesService.publishCourse(id);
      toast.success("Curso publicado com sucesso.");
      refetch();
    } catch (e) {
      toast.error("Erro ao publicar curso.");
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await coursesService.archiveCourse(id);
      toast.success("Curso arquivado com sucesso.");
      refetch();
    } catch (e) {
      toast.error("Erro ao arquivar curso.");
    }
  };

  const renderStatusBadge = (status?: string) => {
    if (status === 'PUBLISHED') return <AdminStatusBadge status="Publicado" variant="success" />;
    if (status === 'ARCHIVED') return <AdminStatusBadge status="Arquivado" variant="secondary" />;
    return <AdminStatusBadge status="Rascunho" variant="warning" />;
  };

  const renderActionMenu = (c: Course) => (
    <div className="flex justify-end items-center gap-1">
      <AdminActionMenu 
        onView={() => router.push(`/admin/cursos/${c.id}`)}
      />
      <Can I="MANAGE_COURSES">
        <AdminActionMenu 
          onEdit={() => router.push(`/admin/cursos/${c.id}/editar`)}
        />
      </Can>
      <Can I="DELETE_COURSES">
        <AdminConfirmDialog
          title="Excluir curso"
          description={`Deseja excluir permanentemente o curso ${c.title}?`}
          onConfirm={() => handleDelete(c.id)}
        >
          <span>
            <AdminActionMenu onDelete={() => {}} />
          </span>
        </AdminConfirmDialog>
      </Can>
    </div>
  );

  const columns = [
    { header: "Código", accessor: (c: Course) => <span className="font-mono text-xs text-slate-500">{c.code || '-'}</span> },
    { header: "Curso", accessor: (c: Course) => <span className="font-bold text-slate-700">{c.title}</span> },
    { header: "Modalidade", accessor: (c: Course) => <Badge variant="outline">{c.modality || 'PRESENCIAL'}</Badge> },
    { header: "Grau", accessor: (c: Course) => <span className="text-slate-500 text-sm">{c.degree || '-'}</span> },
    { header: "C.H.", accessor: (c: Course) => <span className="text-slate-500 text-sm">{c.workload ? `${c.workload}h` : '-'}</span> },
    { header: "Alunos / Turmas", accessor: (c: Course) => (
      <div className="text-sm text-slate-500">{c.totalStudents} / {c.totalClasses || 0}</div>
    ) },
    { header: "Status", accessor: (c: Course) => renderStatusBadge(c.status) },
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
            onClick={() => router.push("/admin/cursos/novo")} 
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
                    <span className="font-mono text-xs text-slate-400">{c.code}</span>
                    <p className="font-bold text-slate-900 leading-tight">{c.title}</p>
                  </div>
                  {renderStatusBadge(c.status)}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{c.modality || 'PRESENCIAL'}</Badge>
                  <span className="text-sm text-slate-500">{c.degree}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>{c.totalClasses || 0} Turmas</span>
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
