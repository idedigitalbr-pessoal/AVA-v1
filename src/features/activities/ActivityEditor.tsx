"use client";

import { ActivityDetail, ActivityAttachment } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { MaterialList } from "@/features/ava-management/MaterialList";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ActivityEditorProps {
  activity: Partial<ActivityDetail>;
  onSave: (activity: Partial<ActivityDetail>) => void;
  onCancel: () => void;
}

export function ActivityEditor({ activity, onSave, onCancel }: ActivityEditorProps) {
  const [title, setTitle] = useState(activity.title || "");
  const [description, setDescription] = useState(activity.description || "");
  const [type, setType] = useState<'UPLOAD' | 'QUIZ'>(activity.type || 'UPLOAD');
  const [dueDate, setDueDate] = useState(activity.dueDate ? new Date(activity.dueDate).toISOString().split('T')[0] : "");
  const [maxScore, setMaxScore] = useState(activity.maxScore?.toString() || "100");
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>(activity.status || 'DRAFT');
  const [attachments, setAttachments] = useState<ActivityAttachment[]>(activity.attachments || []);

  const handleSave = () => {
    onSave({
      ...activity,
      title,
      description,
      type,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      maxScore: parseInt(maxScore),
      status,
      attachments
    });
    toast.success("Atividade salva com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <Button onClick={onCancel} variant="ghost" size="icon" className="text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{activity.id ? "Editar Atividade" : "Nova Atividade"}</h2>
            <p className="text-sm text-slate-500">Configure as instruções, prazo e pontuação.</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="mr-2 h-4 w-4" /> Salvar Atividade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Título da Atividade</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Trabalho Prático 1" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Instruções</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full h-48 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Descreva o que os alunos devem fazer..."
            />
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Materiais Auxiliares</h3>
            <MaterialList attachments={attachments as any} onChange={setAttachments as any} />
          </div>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Configurações Base</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Tipo de Entrega</label>
            <select 
              value={type}
              onChange={e => setType(e.target.value as any)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="UPLOAD">Envio de Arquivo / Link</option>
              <option value="QUIZ">Questionário Automático</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Prazo de Entrega (Data)</label>
            <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Nota Máxima (Pontos)</label>
            <Input type="number" value={maxScore} onChange={e => setMaxScore(e.target.value)} placeholder="Ex: 100" />
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Publicar</h4>
                <p className="text-xs text-slate-500">Alunos poderão ver</p>
              </div>
              <Switch 
                checked={status === 'PUBLISHED'} 
                onCheckedChange={c => setStatus(c ? 'PUBLISHED' : 'DRAFT')} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
