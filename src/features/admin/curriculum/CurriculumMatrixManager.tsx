"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Course, CurriculumPeriod, CurriculumSubject, Subject } from "@/types";
import { courseService } from "@/lib/api/services/courses.service";
import { curriculumService } from "@/lib/api/services/curriculum.service";
import { Button } from "@/components/ui/button";
import { AdminLoadingState, AdminEmptyState, AdminPageHeader } from "../components";
import { ArrowLeft, Plus, Clock } from "lucide-react";
import { PeriodFormModal } from "./PeriodFormModal";
import { CurriculumPeriodCard } from "./CurriculumPeriodCard";
import { AddSubjectToCurriculumModal } from "./AddSubjectToCurriculumModal";

interface CurriculumMatrixManagerProps {
  courseId: string;
}

export function CurriculumMatrixManager({ courseId }: CurriculumMatrixManagerProps) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [periods, setPeriods] = useState<CurriculumPeriod[]>([]);
  const [subjects, setSubjects] = useState<CurriculumSubject[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isPeriodFormOpen, setIsPeriodFormOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<CurriculumPeriod | undefined>();

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [addingToPeriodId, setAddingToPeriodId] = useState<string | null>(null);
  const [editingSubject, setEditingSubject] = useState<CurriculumSubject | undefined>();

  useEffect(() => {
    fetchData();
  }, [courseId]);

  async function fetchData() {
    setLoading(true);
    try {
      const [_course, _periods, _subjects, _availableSubjects] = await Promise.all([
        courseService.getCourseById(courseId),
        curriculumService.getPeriodsByCourse(courseId),
        curriculumService.getSubjectsByCourse(courseId),
        curriculumService.getAvailableSubjects(courseId)
      ]);
      setCourse(_course || null);
      setPeriods(_periods || []);
      setSubjects(_subjects || []);
      setAvailableSubjects(_availableSubjects || []);
    } catch (e) {
      toast.error("Erro ao carregar dados da matriz curricular");
    } finally {
      setLoading(false);
    }
  }

  const handleCreatePeriod = async (data: Partial<CurriculumPeriod>) => {
    try {
      await curriculumService.createPeriod(courseId, { ...data, order: periods.length });
      toast.success("Período criado com sucesso");
      fetchData();
      setIsPeriodFormOpen(false);
    } catch (e) {
      toast.error("Erro ao criar período");
    }
  };

  const handleUpdatePeriod = async (id: string, data: Partial<CurriculumPeriod>) => {
    try {
      await curriculumService.updatePeriod(id, data);
      toast.success("Período atualizado");
      fetchData();
      setIsPeriodFormOpen(false);
      setEditingPeriod(undefined);
    } catch (e) {
      toast.error("Erro ao atualizar período");
    }
  };

  const handleDeletePeriod = async (id: string) => {
    try {
      await curriculumService.deletePeriod(id);
      toast.success("Período excluído");
      fetchData();
    } catch (e) {
      toast.error("Erro ao excluir período");
    }
  };

  const handleAddSubject = async (data: Partial<CurriculumSubject>) => {
    try {
      if (editingSubject) {
        await curriculumService.updateCurriculumSubject(editingSubject.id, data);
        toast.success("Disciplina atualizada");
      } else {
        await curriculumService.addSubjectToCurriculum(data);
        toast.success("Disciplina vinculada ao período");
      }
      fetchData();
      setIsSubjectModalOpen(false);
      setEditingSubject(undefined);
      setAddingToPeriodId(null);
    } catch (e) {
      toast.error("Erro ao salvar disciplina");
    }
  };

  const totalCourseWorkload = subjects.reduce((sum, s) => sum + (s.workload || 0), 0);

  if (loading) return <AdminLoadingState text="Carregando matriz curricular..." />;
  if (!course) return <AdminEmptyState title="Curso não encontrado" description="O curso não existe ou foi removido." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/cursos/${courseId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o Curso
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminPageHeader 
          title={`Matriz Curricular: ${course.title}`} 
          description="Gerencie os semestres/módulos e suas disciplinas."
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200">
            <Clock className="h-5 w-5 text-slate-500" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">Carga Total Calculada</span>
              <span className="text-sm font-semibold text-slate-900">{totalCourseWorkload} horas</span>
            </div>
          </div>
          <Button onClick={() => { setEditingPeriod(undefined); setIsPeriodFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Período
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {periods.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
            <h3 className="text-lg font-medium text-slate-900">Matriz vazia</h3>
            <p className="text-slate-500 mt-1">Este curso ainda não possui períodos letivos definidos na grade.</p>
            <Button className="mt-4" onClick={() => setIsPeriodFormOpen(true)}>
              Criar o Primeiro Período
            </Button>
          </div>
        ) : (
          periods.map((period, index) => {
            const periodSubjects = subjects.filter(s => s.periodId === period.id).sort((a,b) => a.order - b.order);
            return (
              <CurriculumPeriodCard 
                key={period.id} 
                period={period} 
                subjects={periodSubjects}
                allSubjects={subjects}
                isFirst={index === 0}
                isLast={index === periods.length - 1}
                onEditPeriod={() => { setEditingPeriod(period); setIsPeriodFormOpen(true); }}
                onDeletePeriod={() => handleDeletePeriod(period.id)}
                onAddSubject={() => {
                  setEditingSubject(undefined);
                  setAddingToPeriodId(period.id);
                  setIsSubjectModalOpen(true);
                }}
                onEditSubject={(subject) => {
                  setEditingSubject(subject);
                  setAddingToPeriodId(period.id);
                  setIsSubjectModalOpen(true);
                }}
                onDeleteSubject={async (id) => {
                  await curriculumService.removeSubjectFromCurriculum(id);
                  toast.success("Disciplina removida");
                  fetchData();
                }}
                onUpdateSubjectsOrder={async (updated) => {
                  setSubjects(prev => {
                    const others = prev.filter(p => p.periodId !== period.id);
                    return [...others, ...updated];
                  });
                  await curriculumService.reorderCurriculumSubjects(period.id, updated.map(s => s.id));
                }}
              />
            );
          })
        )}
      </div>

      <PeriodFormModal 
        isOpen={isPeriodFormOpen} 
        onClose={() => { setIsPeriodFormOpen(false); setEditingPeriod(undefined); }}
        period={editingPeriod}
        onSubmit={editingPeriod ? 
          (data) => handleUpdatePeriod(editingPeriod.id, data) : 
          handleCreatePeriod
        }
      />

      {addingToPeriodId && (
        <AddSubjectToCurriculumModal
          isOpen={isSubjectModalOpen}
          onClose={() => { setIsSubjectModalOpen(false); setEditingSubject(undefined); setAddingToPeriodId(null); }}
          periodId={addingToPeriodId}
          courseId={courseId}
          subject={editingSubject}
          availableSubjects={availableSubjects}
          allCurriculumSubjects={subjects}
          onSubmit={handleAddSubject}
        />
      )}
    </div>
  );
}
