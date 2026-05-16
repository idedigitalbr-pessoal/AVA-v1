"use client";

import { useState } from "react";
import { ExtendedModule, ExtendedLesson } from "./types";
import { ModuleList } from "./ModuleList";
import { LessonEditor } from "./LessonEditor";
import { LessonPreview } from "./LessonPreview";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ContentManager({ courseId, initialModules = [] }: { courseId: string, initialModules?: ExtendedModule[] }) {
  const [modules, setModules] = useState<ExtendedModule[]>(initialModules);
  
  const [editingLessonId, setEditingLessonId] = useState<{ lessonId: string | null, moduleId: string } | null>(null);
  const [previewLesson, setPreviewLesson] = useState<Partial<ExtendedLesson> | null>(null);
  
  const [editingModule, setEditingModule] = useState<ExtendedModule | null>(null);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [moduleTitleInput, setModuleTitleInput] = useState("");

  // Reordering Modules
  const handleMoveModule = (moduleId: string, direction: 'up' | 'down') => {
    const minIndex = 0;
    const maxIndex = modules.length - 1;
    const index = modules.findIndex(m => m.id === moduleId);
    if (index === -1) return;
    if (direction === 'up' && index === minIndex) return;
    if (direction === 'down' && index === maxIndex) return;

    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newModules[index];
    newModules[index] = newModules[targetIndex];
    newModules[targetIndex] = temp;
    
    // Update order prop
    const updatedModules = newModules.map((m, i) => ({ ...m, order: i + 1 }));
    setModules(updatedModules);
  };

  // Reordering Lessons
  const handleMoveLesson = (lessonId: string, moduleId: string, direction: 'up' | 'down') => {
    setModules(modules.map(m => {
      if (m.id !== moduleId) return m;
      
      const minIndex = 0;
      const maxIndex = m.lessons.length - 1;
      const index = m.lessons.findIndex(l => l.id === lessonId);
      
      if (index === -1) return m;
      if (direction === 'up' && index === minIndex) return m;
      if (direction === 'down' && index === maxIndex) return m;

      const newLessons = [...m.lessons];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = newLessons[index];
      newLessons[index] = newLessons[targetIndex];
      newLessons[targetIndex] = temp;

      return {
        ...m,
        lessons: newLessons.map((l, i) => ({ ...l, order: i + 1 }))
      };
    }));
  };

  const handleAddModule = () => {
    setEditingModule(null);
    setModuleTitleInput("");
    setIsModuleDialogOpen(true);
  };

  const handleEditModule = (moduleId: string) => {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    setEditingModule(mod);
    setModuleTitleInput(mod.title);
    setIsModuleDialogOpen(true);
  };

  const handleSaveModule = () => {
    if (!moduleTitleInput.trim()) return;
    
    if (editingModule) {
      setModules(modules.map(m => m.id === editingModule.id ? { ...m, title: moduleTitleInput } : m));
    } else {
      const newModule: ExtendedModule = {
        id: Date.now().toString(),
        title: moduleTitleInput,
        order: modules.length + 1,
        lessons: []
      };
      setModules([...modules, newModule]);
    }
    setIsModuleDialogOpen(false);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (confirm("Tem certeza que deseja excluir este módulo e todas as suas aulas?")) {
      setModules(modules.filter(m => m.id !== moduleId));
    }
  };

  const handleAddLesson = (moduleId: string) => {
    setEditingLessonId({ lessonId: null, moduleId });
  };

  const handleEditLesson = (lessonId: string, moduleId: string) => {
    setEditingLessonId({ lessonId, moduleId });
  };

  const handleDeleteLesson = (lessonId: string, moduleId: string) => {
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
      setModules(modules.map(m => {
        if (m.id === moduleId) {
          return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
        }
        return m;
      }));
    }
  };

  const handleSaveLesson = (lessonData: Partial<ExtendedLesson>) => {
    if (!editingLessonId) return;

    setModules(modules.map(m => {
      if (m.id === editingLessonId.moduleId) {
        if (editingLessonId.lessonId) {
          // Edit existing
          return {
            ...m,
            lessons: m.lessons.map(l => l.id === editingLessonId.lessonId ? { ...l, ...lessonData } as ExtendedLesson : l)
          };
        } else {
          // Add new
          const newLesson: ExtendedLesson = {
            id: Date.now().toString(),
            moduleId: m.id,
            title: lessonData.title || "Sem título",
            content: lessonData.content,
            videoUrl: lessonData.videoUrl,
            duration: lessonData.duration || 10,
            order: m.lessons.length + 1,
            status: lessonData.status || 'DRAFT',
            releaseDate: lessonData.releaseDate,
            prerequisiteId: lessonData.prerequisiteId,
            isMandatory: lessonData.isMandatory || false,
            attachments: lessonData.attachments || []
          };
          return { ...m, lessons: [...m.lessons, newLesson] };
        }
      }
      return m;
    }));
    setEditingLessonId(null);
  };

  if (previewLesson) {
    return <LessonPreview lesson={previewLesson} onClose={() => setPreviewLesson(null)} />;
  }

  const currentModule = editingLessonId ? modules.find(m => m.id === editingLessonId.moduleId) : null;
  const currentLesson = editingLessonId?.lessonId 
    ? currentModule?.lessons.find(l => l.id === editingLessonId.lessonId) || {}
    : {};

  return (
    <>
      <ModuleList 
        modules={modules}
        onAddModule={handleAddModule}
        onEditModule={handleEditModule}
        onDeleteModule={handleDeleteModule}
        onAddLesson={handleAddLesson}
        onEditLesson={handleEditLesson}
        onDeleteLesson={handleDeleteLesson}
        onMoveModule={handleMoveModule}
        onMoveLesson={handleMoveLesson}
      />

      <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingModule ? 'Editar Módulo' : 'Novo Módulo'}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-semibold mb-2 block">Título do Módulo</label>
            <Input 
              value={moduleTitleInput} 
              onChange={e => setModuleTitleInput(e.target.value)} 
              placeholder="Ex: Introdução ao Curso"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModuleDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveModule} className="bg-indigo-600 hover:bg-indigo-700 text-white">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={!!editingLessonId} onOpenChange={(open) => !open && setEditingLessonId(null)}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto p-0 flex flex-col">
          <SheetHeader className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10 shrink-0">
            <SheetTitle>
              {editingLessonId?.lessonId ? "Editar Aula" : "Criar Nova Aula"}
            </SheetTitle>
            <SheetDescription>Configuração completa da aula para o módulo: {currentModule?.title}</SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <div className="p-6">
              {editingLessonId && (
                <LessonEditor 
                  lesson={currentLesson} 
                  courseModules={modules}
                  onSave={handleSaveLesson} 
                  onCancel={() => setEditingLessonId(null)}
                  onPreview={(lessonData) => setPreviewLesson(lessonData)}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
