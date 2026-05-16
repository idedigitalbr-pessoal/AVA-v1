"use client";

import { ActivityDetail, ActivitySubmission } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Download, Link as LinkIcon, FileText } from "lucide-react";
import { useState } from "react";

interface SubmissionGraderProps {
  activity: ActivityDetail;
  submission: ActivitySubmission;
  onSave: (grade: number, feedback: string) => void;
  onCancel: () => void;
}

export function SubmissionGrader({ activity, submission, onSave, onCancel }: SubmissionGraderProps) {
  const [grade, setGrade] = useState(submission.grade?.toString() || "");
  const [feedback, setFeedback] = useState(submission.feedback || "");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <Button onClick={onCancel} variant="ghost" size="icon" className="text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Corrigir Entrega</h2>
            <p className="text-sm text-slate-500">{submission.studentName} • {activity.title}</p>
          </div>
        </div>
        <Button onClick={() => onSave(Number(grade), feedback)} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" /> Salvar Nota
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Conteúdo Enviado</h3>
              
              <div className="mb-4 text-sm text-slate-500 flex items-center">
                 <span className="font-semibold text-slate-700 mr-2">Enviado em:</span> 
                 {new Date(submission.submittedAt).toLocaleString()}
              </div>

              {submission.fileUrl ? (
                 <a href="#" className="flex items-center p-4 border border-slate-200 rounded-lg bg-slate-50 text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <Download className="h-5 w-5 mr-3" />
                    <span className="font-medium text-sm">Fazer download do anexo da entrega</span>
                 </a>
              ) : submission.content.startsWith('http') ? (
                 <a href={submission.content} target="_blank" rel="noreferrer" className="flex items-center p-4 border border-slate-200 rounded-lg bg-slate-50 text-blue-600 hover:bg-blue-50 transition-colors">
                    <LinkIcon className="h-5 w-5 mr-3" />
                    <span className="font-medium text-sm">{submission.content}</span>
                 </a>
              ) : (
                 <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                   <div className="flex items-center text-slate-500 mb-2">
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="text-xs font-semibold uppercase">Texto</span>
                   </div>
                   <p className="text-sm text-slate-700 whitespace-pre-wrap">{submission.content}</p>
                 </div>
              )}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Avaliação</h3>
              
              <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-800">
                    Nota (Máx: {activity.maxScore})
                 </label>
                 <Input 
                   type="number" 
                   value={grade} 
                   onChange={e => setGrade(e.target.value)} 
                   placeholder={`0 - ${activity.maxScore}`}
                   className="text-lg font-semibold"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-800">Feedback ao Aluno</label>
                 <textarea 
                   value={feedback}
                   onChange={e => setFeedback(e.target.value)}
                   className="w-full h-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                   placeholder="Muito bom trabalho..."
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
