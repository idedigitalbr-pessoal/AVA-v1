"use client";

import { ActivityDetail, ActivitySubmission } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, FileText, Upload, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface StudentActivitySubmitProps {
  activity: ActivityDetail;
  submission?: ActivitySubmission;
  onSubmit: (content: string, fileUrl?: string) => void;
  onBack: () => void;
}

export function StudentActivitySubmit({ activity, submission, onSubmit, onBack }: StudentActivitySubmitProps) {
  const [content, setContent] = useState(submission?.content || "");
  const [fileUrl, setFileUrl] = useState(submission?.fileUrl || "");

  const isGraded = submission?.status === 'GRADED';
  const isSubmitted = submission?.status === 'SUBMITTED' || isGraded;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <Button onClick={onBack} variant="ghost" size="icon" className="text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{activity.title}</h2>
          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
             <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> Prazo: {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'Sem prazo'}</span>
             <span>•</span>
             <span>Valor: {activity.maxScore} pontos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Instruções</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{activity.description}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 mb-2">Seu Trabalho</h3>
            
            {!isSubmitted ? (
               <>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-800">Texto ou Link do trabalho</label>
                   <textarea 
                     value={content}
                     onChange={e => setContent(e.target.value)}
                     className="w-full h-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                     placeholder="Cole o link do seu trabalho ou escreva sua resposta aqui..."
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-800">Anexar Arquivo (Opcional - link mockup)</label>
                   <Input 
                     value={fileUrl}
                     onChange={e => setFileUrl(e.target.value)}
                     placeholder="https://..."
                   />
                 </div>
                 <div className="pt-4 flex justify-end">
                   <Button onClick={() => onSubmit(content, fileUrl)} className="bg-indigo-600 hover:bg-indigo-700">
                      <Upload className="h-4 w-4 mr-2" /> Enviar Tarefa
                   </Button>
                 </div>
               </>
            ) : (
               <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-start gap-3">
                 <CheckCircle className="h-5 w-5 mt-0.5" />
                 <div>
                   <p className="font-bold">Trabalho Enviado</p>
                   <p className="text-sm mt-1">Data do envio: {new Date(submission?.submittedAt || '').toLocaleString()}</p>
                 </div>
               </div>
            )}
          </div>
        </div>

        {isGraded && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Feedback do Professor</h3>
            <div className="text-center py-4">
               <span className="text-4xl font-extrabold text-slate-900">{submission?.grade}</span>
               <span className="text-lg text-slate-400 font-medium"> / {activity.maxScore}</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 italic">
               &quot;{submission?.feedback}&quot;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
