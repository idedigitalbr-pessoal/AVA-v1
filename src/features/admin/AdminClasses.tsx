"use client";

import { useState } from "react";
import { toast } from "sonner";
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

  const renderActionMenu = (cls: Class) => (
    <div className="flex justify-end items-center gap-1">
      <AdminActionMenu 
        onEdit={() => toast.success(`Editar turma ${cls.name}`)}
      />
      <AdminConfirmDialog
        title="Excluir turma"
        description={`Deseja excluir a turma ${cls.name}?`}
        onConfirm={() => toast.success(`Turma ${cls.name} excluída.`)}
      >
        <span>
          <AdminActionMenu onDelete={() => {}} />
        </span>
      </AdminConfirmDialog>
    </div>
  );

  const columns = [
    { header: "Turma", accessor: (cls: Class) => <span className="font-medium text-slate-900">{cls.name}</span> },
    { header: "Curso", accessor: (cls: Class) => <span className="text-slate-500">{coursesMap[cls.courseId]?.title || 'Curso não encontrado'}</span> },
    { header: "Ano Letivo", accessor: (cls: Class) => <Badge variant="outline" className="text-slate-600">{cls.academicYear}</Badge> },
    { header: "Início", accessor: (cls: Class) => <span className="text-slate-500">{cls.startDate}</span> },
    { header: "Ação", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Turmas" 
        description="Gerencie as turmas ativas na instituição." 
        action={
          <AdminCreateButton 
            label="Nova Turma" 
            onClick={() => toast.success("Iniciando cadastro...")} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
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
          />
        ) : (
          <AdminDataTable 
            data={filteredClasses}
            columns={columns}
            keyExtractor={(cls) => cls.id}
            renderMobileCard={(cls) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-slate-900">{cls.name}</p>
                    <p className="text-sm text-slate-500 line-clamp-1">{coursesMap[cls.courseId]?.title || 'Curso não encontrado'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Badge variant="outline" className="text-slate-600">{cls.academicYear}</Badge>
                  <span className="flex items-center">Início: {cls.startDate}</span>
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
