"use client";

import { ExtendedLesson, Attachment, ExtendedModule } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useState, useMemo } from "react";
import { MaterialList } from "./MaterialList";
import { Switch } from "@/components/ui/switch";

interface LessonEditorProps {
  lesson: Partial<ExtendedLesson>;
  courseModules?: ExtendedModule[];
  onSave: (lesson: Partial<ExtendedLesson>) => void;
  onCancel: () => void;
  onPreview: (lesson: Partial<ExtendedLesson>) => void;
}

export function LessonEditor({ lesson, courseModules = [], onSave, onCancel, onPreview }: LessonEditorProps) {
  const [title, setTitle] = useState(lesson.title || "");
  const [content, setContent] = useState(lesson.content || "");
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl || "");
  const [duration, setDuration] = useState(lesson.duration?.toString() || "10");
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>(lesson.status || 'DRAFT');
  const [isMandatory, setIsMandatory] = useState(lesson.isMandatory || false);
  const [releaseDate, setReleaseDate] = useState(lesson.releaseDate || "");
  const [prerequisiteId, setPrerequisiteId] = useState(lesson.prerequisiteId || "");
  const [attachments, setAttachments] = useState<Attachment[]>(lesson.attachments || []);

  const handleSave = () => {
    onSave({
      ...lesson,
      title,
      content,
      videoUrl,
      duration: parseInt(duration),
      status,
      isMandatory,
      releaseDate,
      prerequisiteId,
      attachments
    });
  };

  const allLessons = useMemo(() => {
    return courseModules.flatMap(m => m.lessons).filter(l => l.id !== lesson.id);
  }, [courseModules, lesson.id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{lesson.id ? "Editar Aula" : "Nova Aula"}</h2>
          <p className="text-sm text-slate-500">Configure os detalhes da sua aula.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={onCancel} variant="outline" className="flex-1 sm:flex-none">
            Cancelar
          </Button>
          <Button onClick={() => onPreview({ title, content, videoUrl, attachments })} variant="outline" className="flex-1 sm:flex-none text-slate-700">
            <Eye className="mr-2 h-4 w-4" /> Prévia
          </Button>
          <Button onClick={handleSave} className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700">
            <Save className="mr-2 h-4 w-4" /> Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Título da Aula</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Introdução ao React" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">URL do Vídeo (Opcional)</label>
            <Input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Texto / Descrição da Aula</label>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              className="w-full h-48 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Digite o conteúdo em texto ou orientações..."
            />
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Materiais Complementares</h3>
            <MaterialList attachments={attachments} onChange={setAttachments} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Configurações</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Duração Estimada (min)</label>
              <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900">Publicado</h4>
                  <p className="text-xs text-slate-500">Visível para alunos</p>
                </div>
                <Switch 
                  checked={status === 'PUBLISHED'} 
                  onCheckedChange={c => setStatus(c ? 'PUBLISHED' : 'DRAFT')} 
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h4 className="text-sm font-medium text-slate-900">Aula Obrigatória</h4>
                  <p className="text-xs text-slate-500">Deve ser concluída pelo aluno</p>
                </div>
                <Switch 
                  checked={isMandatory} 
                  onCheckedChange={setIsMandatory} 
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Data de Liberação (Opcional)</label>
                <Input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
                <p className="text-[10px] text-slate-400">Deixe em branco para liberar imediatamente.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Pré-requisito (Opcional)</label>
                <select 
                  value={prerequisiteId}
                  onChange={e => setPrerequisiteId(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Nenhum</option>
                  {allLessons.map(l => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400">O aluno deverá concluir a aula selecionada antes de acessar esta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
