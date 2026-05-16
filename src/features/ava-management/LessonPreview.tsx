"use client";

import { ExtendedLesson } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, FileText, Link as LinkIcon, Paperclip } from "lucide-react";

interface LessonPreviewProps {
  lesson: Partial<ExtendedLesson>;
  onClose: () => void;
}

export function LessonPreview({ lesson, onClose }: LessonPreviewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />;
      case 'LINK': return <LinkIcon className="h-5 w-5 text-blue-500" />;
      default: return <Paperclip className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <Button onClick={onClose} variant="ghost" size="icon" className="text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Modo Visualização (Aluno)</h2>
          <p className="text-sm text-slate-500">É assim que esta aula aparecerá no AVA.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {lesson.videoUrl && (
          <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
            <PlayCircle className="h-16 w-16 text-white/50" />
            <div className="absolute bottom-4 left-4 text-white font-mono text-sm bg-black/50 px-2 py-1 rounded">
              Mock de Vídeo Player
            </div>
          </div>
        )}

        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{lesson.title || 'Sem Título'}</h1>
          
          {lesson.content && (
            <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap mb-10">
              {lesson.content}
            </div>
          )}

          {lesson.attachments && lesson.attachments.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Materiais de Apoio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lesson.attachments.map(att => (
                  <a key={att.id} href="#" onClick={e => e.preventDefault()} className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="bg-white p-2 rounded-md shadow-sm border border-slate-100">
                      {getIcon(att.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{att.name}</p>
                      <p className="text-xs text-slate-500 truncate">{att.type === 'LINK' ? 'Acessar Link Externo' : 'Fazer Download'}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
