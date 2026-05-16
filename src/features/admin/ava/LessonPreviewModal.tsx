"use client";

import { Lesson } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlayCircle, FileText, Link as LinkIcon, Download } from "lucide-react";

interface LessonPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

export function LessonPreviewModal({ isOpen, onClose, lesson }: LessonPreviewModalProps) {
  if (!lesson) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="bg-slate-100 text-slate-500 font-mono text-xs px-2 py-1 rounded">PRÉ-VISUALIZAÇÃO ALUNO</span>
            {lesson.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Main Video or Content Area */}
          <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group">
            {lesson.videoUrl ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <PlayCircle className="h-16 w-16 mb-2 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer group-hover:text-blue-500" />
                <p className="text-sm">Player de Vídeo Simulado ({lesson.videoUrl})</p>
              </div>
            ) : (
                <div className="text-slate-500">Nenhum vídeo principal configurado.</div>
            )}
          </div>

          <div className="prose prose-sm max-w-none text-slate-700">
            {lesson.content ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            ) : (
              <p className="italic text-slate-500">Aula sem conteúdo de texto descritivo.</p>
            )}
          </div>

          {/* Materials Section */}
          {lesson.materials && lesson.materials.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h4 className="font-semibold text-slate-900">Materiais Complementares</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.materials.map(mat => (
                  <div key={mat.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="p-2 bg-slate-100 rounded text-slate-500">
                      {mat.type === 'PDF' || mat.type === 'DOC' ? <FileText className="h-5 w-5" /> : 
                       mat.type === 'VIDEO' ? <PlayCircle className="h-5 w-5" /> : 
                       <LinkIcon className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{mat.title}</p>
                      <p className="text-xs text-slate-500">{mat.type}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                      {mat.type === 'LINK' ? <LinkIcon className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments Section (Legacy compat) */}
          {lesson.attachments && lesson.attachments.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h4 className="font-semibold text-slate-900">Anexos (Legado)</h4>
              <ul className="space-y-2">
                {lesson.attachments.map((att, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                    <FileText className="h-4 w-4" /> {att.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
