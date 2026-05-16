"use client";

import { CurriculumPeriod, CurriculumSubject } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Plus, Trash2 } from "lucide-react";
import { AdminConfirmDialog } from "../components/AdminConfirmDialog";
import { CurriculumSubjectRow } from "./CurriculumSubjectRow";

interface CurriculumPeriodCardProps {
  period: CurriculumPeriod;
  subjects: CurriculumSubject[];
  allSubjects: CurriculumSubject[];
  isFirst: boolean;
  isLast: boolean;
  onEditPeriod: () => void;
  onDeletePeriod: () => void;
  onAddSubject: () => void;
  onEditSubject: (subject: CurriculumSubject) => void;
  onDeleteSubject: (id: string) => void;
  onUpdateSubjectsOrder: (ordered: CurriculumSubject[]) => void;
}

export function CurriculumPeriodCard({ 
  period, subjects, allSubjects, isFirst, isLast, 
  onEditPeriod, onDeletePeriod, onAddSubject, onEditSubject, onDeleteSubject, onUpdateSubjectsOrder 
}: CurriculumPeriodCardProps) {
  
  const handleMoveSubject = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === subjects.length - 1)
    ) return;

    const newSubjects = [...subjects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newSubjects[index];
    newSubjects[index] = newSubjects[targetIndex];
    newSubjects[targetIndex] = temp;

    const updatedOrder = newSubjects.map((s, i) => ({ ...s, order: i }));
    onUpdateSubjectsOrder(updatedOrder);
  };

  const periodWorkload = subjects.reduce((sum, s) => sum + (s.workload || 0), 0);

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              {period.name}
              <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                {periodWorkload}h
              </span>
            </CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onAddSubject}>
            <Plus className="h-3 w-3 mr-1" /> Disciplina
          </Button>
          <Button variant="ghost" size="icon" onClick={onEditPeriod}>
            <Edit2 className="h-4 w-4 text-slate-500" />
          </Button>
          <AdminConfirmDialog
            title="Excluir Período"
            description="Tem certeza? Todas as disciplinas vinculadas serão desvinculadas deste período."
            onConfirm={onDeletePeriod}
          >
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-rose-500" />
            </Button>
          </AdminConfirmDialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {subjects.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-slate-500">Nenhuma disciplina vinculada a este período.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {subjects.map((subject, index) => (
              <CurriculumSubjectRow 
                key={subject.id} 
                subject={subject} 
                allSubjects={allSubjects}
                isFirst={index === 0}
                isLast={index === subjects.length - 1}
                onMoveUp={() => handleMoveSubject(index, 'up')}
                onMoveDown={() => handleMoveSubject(index, 'down')}
                onEdit={() => onEditSubject(subject)}
                onDelete={() => onDeleteSubject(subject.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
