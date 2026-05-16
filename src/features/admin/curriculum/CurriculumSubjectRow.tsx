"use client";

import { CurriculumSubject } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";
import { AdminConfirmDialog } from "../components/AdminConfirmDialog";
import { Badge } from "@/components/ui/badge";

interface CurriculumSubjectRowProps {
  subject: CurriculumSubject;
  allSubjects: CurriculumSubject[];
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CurriculumSubjectRow({ subject, allSubjects, isFirst, isLast, onMoveUp, onMoveDown, onEdit, onDelete }: CurriculumSubjectRowProps) {
  
  const prereqs = subject.prerequisites?.map(id => {
    return allSubjects.find(s => s.id === id)?.subjectName || 'Desconhecida';
  }).join(', ');

  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-5 w-5" disabled={isFirst} onClick={onMoveUp}>
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-5 w-5" disabled={isLast} onClick={onMoveDown}>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-slate-100 text-slate-500 px-1 rounded">{subject.subjectCode}</span>
            <span className="text-sm font-medium text-slate-800">{subject.subjectName}</span>
            {subject.isMandatory ? (
              <Badge variant="outline" className="text-[10px] text-slate-500 font-normal">Obrigatória</Badge>
            ) : (
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none text-[10px] font-normal">Optativa</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
            <span>CH: {subject.workload}h</span>
            {prereqs && (
              <span className="truncate max-w-[200px] sm:max-w-[400px]" title={prereqs}>
                <span className="font-medium mr-1">Pré-reqs:</span> 
                {prereqs}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit2 className="h-4 w-4 text-slate-500" />
        </Button>
        <AdminConfirmDialog
          title="Remover Disciplina"
          description={`Deseja remover "${subject.subjectName}" da matriz curricular?`}
          onConfirm={onDelete}
        >
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-rose-500" />
          </Button>
        </AdminConfirmDialog>
      </div>
    </div>
  );
}
