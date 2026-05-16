"use client";

import { ExtendedModule } from "./types";
import { Button } from "@/components/ui/button";
import { GripVertical, PlusCircle, Edit2, Trash2, Video, FileText, CheckCircle, Clock, ChevronUp, ChevronDown } from "lucide-react";

interface ModuleListProps {
  modules: ExtendedModule[];
  onAddModule: () => void;
  onEditModule: (moduleId: string) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string) => void;
  onEditLesson: (lessonId: string, moduleId: string) => void;
  onDeleteLesson: (lessonId: string, moduleId: string) => void;
  onMoveModule: (moduleId: string, direction: 'up' | 'down') => void;
  onMoveLesson: (lessonId: string, moduleId: string, direction: 'up' | 'down') => void;
}

export function ModuleList({ 
  modules, 
  onAddModule, 
  onEditModule, 
  onDeleteModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onMoveModule,
  onMoveLesson
}: ModuleListProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Módulos e Aulas</h2>
          <p className="text-sm text-slate-500">Adicione e reordene módulos e aulas.</p>
        </div>
        <Button onClick={onAddModule} className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Módulo
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map((m, mIdx) => (
          <div key={m.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200 group">
               <div className="flex items-center gap-3 w-full">
                 <div className="flex flex-col gap-0">
                    <button disabled={mIdx === 0} onClick={() => onMoveModule(m.id, 'up')} className="p-0.5 text-slate-300 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-300">
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button disabled={mIdx === modules.length - 1} onClick={() => onMoveModule(m.id, 'down')} className="p-0.5 text-slate-300 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-300">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                 </div>
                 <span className="font-bold text-slate-900 flex-1">Módulo {m.order}: {m.title}</span>
               </div>
               <div className="flex gap-1 xl:gap-2">
                 <Button onClick={() => onAddLesson(m.id)} variant="ghost" size="sm" className="h-8 text-slate-600 hover:text-indigo-600 text-xs font-medium">
                    <PlusCircle className="h-3.5 w-3.5 mr-1" /> <span className="hidden sm:inline">Nova Aula</span>
                 </Button>
                 <Button onClick={() => onEditModule(m.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                    <Edit2 className="h-4 w-4" />
                 </Button>
                 <Button onClick={() => onDeleteModule(m.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
            </div>
            
            <div className="divide-y divide-slate-100 p-2">
               {m.lessons.length > 0 ? m.lessons.map((l, lIdx) => (
                 <div key={l.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors">
                   <div className="flex items-center gap-3 flex-1">
                     <div className="flex flex-col gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button disabled={lIdx === 0} onClick={() => onMoveLesson(l.id, m.id, 'up')} className="p-0.5 text-slate-300 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-300">
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <button disabled={lIdx === m.lessons.length - 1} onClick={() => onMoveLesson(l.id, m.id, 'down')} className="p-0.5 text-slate-300 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-300">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                     </div>
                     {l.videoUrl ? <Video className="h-4 w-4 text-indigo-500 flex-shrink-0" /> : <FileText className="h-4 w-4 text-slate-400 flex-shrink-0" />}
                     <div className="flex flex-col min-w-0">
                       <span className="text-sm font-medium text-slate-700 truncate pr-2">{l.order}. {l.title} {l.isMandatory && <span className="text-xs text-red-500 font-bold ml-2">*Obrigatória</span>}</span>
                       <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap">
                         {l.status === 'PUBLISHED' ? (
                           <span className="flex items-center text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                             <CheckCircle className="h-3 w-3 mr-1" /> Publicado
                           </span>
                         ) : (
                           <span className="flex items-center text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                             <Clock className="h-3 w-3 mr-1" /> Rascunho
                           </span>
                         )}
                         <span className="text-[11px] text-slate-400">{l.duration} min</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                       <Button onClick={() => onEditLesson(l.id, m.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                         <Edit2 className="h-4 w-4" />
                       </Button>
                       <Button onClick={() => onDeleteLesson(l.id, m.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 className="h-4 w-4" />
                       </Button>
                   </div>
                 </div>
               )) : (
                 <div className="p-6 text-sm text-center text-slate-400 italic bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                   Nenhuma aula neste módulo. Clique em &quot;Nova Aula&quot; para adicionar.
                 </div>
               )}
            </div>
          </div>
        ))}

        {modules.length === 0 && (
          <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-xl">
            Nenhum módulo criado. Comece adicionando um módulo.
          </div>
        )}
      </div>
    </div>
  );
}
