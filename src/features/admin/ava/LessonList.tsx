"use client";

import { Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, PlayCircle, Eye, EyeOff, Trash2, Calendar, FileText, Link, Video } from "lucide-react";
import { AdminConfirmDialog } from "../components/AdminConfirmDialog";
import { LessonPreviewModal } from "./LessonPreviewModal";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface LessonListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (lesson: Lesson) => void;
  onUpdateLessonsOrder: (lessons: Lesson[]) => void;
}

export function LessonList({ lessons, onEdit, onDelete, onTogglePublish, onUpdateLessonsOrder }: LessonListProps) {
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === lessons.length - 1)
    ) return;

    const newLessons = [...lessons];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newLessons[index];
    newLessons[index] = newLessons[targetIndex];
    newLessons[targetIndex] = temp;

    const updatedOrder = newLessons.map((l, i) => ({ ...l, order: i }));
    onUpdateLessonsOrder(updatedOrder);
    // Em um app real, faria a chamada à API logo após atualizar a ordem local
  };

  const getMaterialsSummary = (lesson: Lesson) => {
    const counts = { video: 0, pdf: 0, link: 0, doc: 0 };
    lesson.materials?.forEach(m => {
      if (m.type === 'VIDEO') counts.video++;
      if (m.type === 'PDF') counts.pdf++;
      if (m.type === 'LINK') counts.link++;
      if (m.type === 'DOC') counts.doc++;
    });

    const items = [];
    if (counts.video > 0) items.push(<span key="v" className="flex items-center gap-1"><Video className="h-3 w-3" /> {counts.video}</span>);
    if (counts.pdf > 0 || counts.doc > 0) items.push(<span key="p" className="flex items-center gap-1"><FileText className="h-3 w-3" /> {counts.pdf + counts.doc}</span>);
    if (counts.link > 0) items.push(<span key="l" className="flex items-center gap-1"><Link className="h-3 w-3" /> {counts.link}</span>);
    
    return items;
  };

  return (
    <>
      <div className="divide-y divide-slate-100">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className={`flex items-center justify-between p-3 transition-colors ${!lesson.isPublished ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-0">
                <Button variant="ghost" size="icon" className="h-5 w-5" disabled={index === 0} onClick={() => handleMove(index, 'up')}>
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5" disabled={index === lessons.length - 1} onClick={() => handleMove(index, 'down')}>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${lesson.isPublished ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                  <PlayCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${!lesson.isPublished ? 'text-slate-500' : 'text-slate-800'}`}>
                      {lesson.title}
                    </span>
                    {!lesson.isPublished && (
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold">Rascunho</Badge>
                    )}
                    {lesson.isMandatory && (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-[10px] uppercase font-semibold border-0">Obrigatória</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    {lesson.duration > 0 && (
                      <span className="text-xs text-slate-500">{lesson.duration} min</span>
                    )}
                    {lesson.releaseDate && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(lesson.releaseDate).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      {getMaterialsSummary(lesson)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: 1 }}>
              <Button variant="ghost" size="icon" title="Pré-visualizar como aluno" onClick={() => setPreviewLesson(lesson)}>
                <Eye className="h-4 w-4 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon" title={lesson.isPublished ? "Despublicar" : "Publicar"} onClick={() => onTogglePublish(lesson)}>
                {lesson.isPublished ? <EyeOff className="h-4 w-4 text-slate-500" /> : <Eye className="h-4 w-4 text-emerald-600" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onEdit(lesson)}>
                <Edit2 className="h-4 w-4 text-slate-500" />
              </Button>
              <AdminConfirmDialog
                title="Excluir Aula"
                description={`Tem certeza que deseja excluir a aula "${lesson.title}"?`}
                onConfirm={() => onDelete(lesson.id)}
              >
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-rose-500" />
                </Button>
              </AdminConfirmDialog>
            </div>
          </div>
        ))}
      </div>

      <LessonPreviewModal 
        isOpen={!!previewLesson} 
        onClose={() => setPreviewLesson(null)} 
        lesson={previewLesson} 
      />
    </>
  );
}
