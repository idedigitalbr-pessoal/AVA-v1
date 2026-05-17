"use client";

import { useState, useEffect } from "react";
import { Module, Lesson } from "@/types";
import { avaService } from "@/lib/api/services/ava.service";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Plus, Trash2 } from "lucide-react";
import { AdminConfirmDialog } from "../components/AdminConfirmDialog";
import { LessonList } from "./LessonList";
import { LessonFormDrawer } from "./LessonFormDrawer";

interface ModuleCardProps {
  module: Module;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ModuleCard({ module, isFirst, isLast, onMoveUp, onMoveDown, onEdit, onDelete }: ModuleCardProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLessonDrawOpen, setIsLessonDrawOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchLessons();
  }, [module.id]);

  async function fetchLessons() {
    try {
      setLoading(true);
      const data = await avaService.listLessonsByModule(module.id);
      setLessons(data || []);
    } catch (e) {
      toast.error(`Erro ao carregar aulas do módulo: ${module.title}`);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteLesson = async (id: string) => {
    try {
      await avaService.deleteLesson(id);
      toast.success("Aula excluída");
      fetchLessons();
    } catch (e) {
      toast.error("Erro ao excluir aula");
    }
  };

  const handleTogglePublish = async (lesson: Lesson) => {
    try {
      if (lesson.isPublished) {
        await avaService.unpublishLesson(lesson.id);
        toast.success("Aula despublicada");
      } else {
        await avaService.publishLesson(lesson.id);
        toast.success("Aula publicada");
      }
      fetchLessons();
    } catch (e) {
      toast.error("Erro ao alterar status da aula");
    }
  };

  const handleLessonSubmit = async (data: Partial<Lesson>) => {
    try {
      if (editingLesson) {
        await avaService.updateLesson(editingLesson.id, data);
        toast.success("Aula atualizada");
      } else {
        await avaService.createLesson(module.id, { ...data, order: lessons.length });
        toast.success("Aula criada");
      }
      setIsLessonDrawOpen(false);
      setEditingLesson(undefined);
      fetchLessons();
    } catch (e) {
      toast.error("Erro ao salvar aula");
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" disabled={isFirst} onClick={onMoveUp}>
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" disabled={isLast} onClick={onMoveDown}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-slate-800">
              Módulo {module.order + 1}: {module.title}
            </CardTitle>
            {module.description && (
              <p className="text-sm text-slate-500 mt-1">{module.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setEditingLesson(undefined); setIsLessonDrawOpen(true); }}>
            <Plus className="h-3 w-3 mr-1" /> Aula
          </Button>
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit2 className="h-4 w-4 text-slate-500" />
          </Button>
          <AdminConfirmDialog
            title="Excluir Módulo"
            description="Tem certeza? Todas as aulas deste módulo serão apagadas."
            onConfirm={onDelete}
          >
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-rose-500" />
            </Button>
          </AdminConfirmDialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-4 text-center text-sm text-slate-500">Carregando aulas...</div>
        ) : lessons.length === 0 ? (
          <div className="p-4 text-center text-sm text-slate-500">Nenhuma aula neste módulo.</div>
        ) : (
          <LessonList 
            lessons={lessons} 
            onEdit={(l) => { setEditingLesson(l); setIsLessonDrawOpen(true); }}
            onDelete={handleDeleteLesson}
            onTogglePublish={handleTogglePublish}
            onUpdateLessonsOrder={(orderedLessons) => setLessons(orderedLessons)}
          />
        )}
      </CardContent>

      <LessonFormDrawer 
        isOpen={isLessonDrawOpen}
        onClose={() => { setIsLessonDrawOpen(false); setEditingLesson(undefined); }}
        lesson={editingLesson}
        onSubmit={handleLessonSubmit}
      />
    </Card>
  );
}
