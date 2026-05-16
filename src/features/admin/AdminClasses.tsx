"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useClasses, useCourses } from "@/hooks/use-queries";
import { ErrorState } from "@/components/ui/error-state";
import { Class } from "@/types";
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

export function AdminClasses() {
  const router = useRouter();
  const { data: classes, isLoading: isClassesLoading, error: classesError, refetch: refetchClasses } = useClasses();
  const { data: courses, isLoading: isCoursesLoading, error: coursesError, refetch: refetchCourses } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");

  const isLoading = isClassesLoading || isCoursesLoading;
  const error = classesError || coursesError;

  if (error) {
    return <ErrorState onRetry={() => { refetchClasses(); refetchCourses(); }} error={error as Error} />
  }

  const coursesMap = courses?.reduce((acc, course) => {
    acc[course.id] = course;
    return acc;
  }, {} as Record<string, any>) || {};

  const filteredClasses = classes?.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coursesMap[c.courseId]?.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderStatus = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">Ativa</Badge>;
      case 'FINISHED':
        return <Badge variant="outline" className="text-slate-500">Concluída</Badge>;
      case 'ARCHIVED':
        return <Badge variant="outline" className="text-slate-400 border-slate-200">Arquivada</Badge>;
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const renderActionMenu = (cls: Class) => (
    <div className="flex justify-end items-center gap-1">
      <AdminActionMenu 
        onView={() => router.push(`/admin/turmas/${cls.id}`)}
        onEdit={() => router.push(`/admin/turmas/${cls.id}/editar`)}
      />
      <AdminConfirmDialog
        title="Arquivar turma"
        description={`Deseja arquivar a turma ${cls.name}?`}
        onConfirm={() => toast.success(`Turma ${cls.name} arquivada.`)}
      >
        <span>
          <AdminActionMenu onDelete={() => {}} />
        </span>
      </AdminConfirmDialog>
    </div>
  );

  const columns = [
    { header: "Turma", accessor: (cls: Class) => <span className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => router.push(`/admin/turmas/${cls.id}`)}>{cls.name}</span> },
    { header: "Curso", accessor: (cls: Class) => <span className="text-slate-500 line-clamp-1 max-w-[200px]">{coursesMap[cls.courseId]?.title || 'Curso não encontrado'}</span> },
    { header: "Período", accessor: (cls: Class) => <Badge variant="outline" className="text-slate-600 font-normal">{cls.academicYear}</Badge> },
    { header: "Início/Fim", accessor: (cls: Class) => <span className="text-slate-500 text-xs">{cls.startDate} a {cls.endDate}</span> },
    { header: "Alunos", accessor: (cls: Class) => <span className="text-slate-500">{cls.studentsCount || 0}</span> },
    { header: "Disciplinas", accessor: (cls: Class) => <span className="text-slate-500">{cls.subjectsCount || 0}</span> },
    { header: "Status", accessor: (cls: Class) => renderStatus(cls.status) },
    { header: "Ações", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Turmas" 
        description="Gerencie as turmas ativas na instituição." 
        action={
          <AdminCreateButton 
            label="Nova Turma" 
            onClick={() => router.push('/admin/turmas/novo')} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por turma ou curso..." 
          />
        </AdminFilterBar>

        {isLoading ? (
          <AdminLoadingState text="Carregando turmas..." />
        ) : filteredClasses.length === 0 ? (
          <AdminEmptyState 
            title="Nenhuma turma encontrada"
            description="Você ainda não cadastrou nenhuma turma ou a busca não retornou resultados."
            action={
              <AdminCreateButton 
                label="Criar Turma" 
                onClick={() => router.push('/admin/turmas/novo')} 
              />
            }
          />
        ) : (
          <AdminDataTable 
            data={filteredClasses}
            columns={columns}
            keyExtractor={(cls) => cls.id}
            renderMobileCard={(cls) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div onClick={() => router.push(`/admin/turmas/${cls.id}`)} className="cursor-pointer">
                    <p className="font-bold text-slate-900">{cls.name}</p>
                    <p className="text-sm text-slate-500 line-clamp-1">{coursesMap[cls.courseId]?.title || 'Curso não encontrado'}</p>
                  </div>
                  <div>
                    {renderStatus(cls.status)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Badge variant="outline" className="text-slate-600">{cls.academicYear}</Badge>
                  <span className="flex items-center">Alunos: {cls.studentsCount || 0}</span>
                  <span className="flex items-center">Disciplinas: {cls.subjectsCount || 0}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  {renderActionMenu(cls)}
                </div>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}

