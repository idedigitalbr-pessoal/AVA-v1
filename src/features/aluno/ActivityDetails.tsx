"use client";

import { StudentActivityDetail } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Clock, FileText, UploadCloud, CheckCircle, ChevronLeft, Download, Paperclip } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { studentActivitiesService } from "@/lib/api/services/student-activities.service";

export function ActivityDetails({
  activity,
  onBack
}: {
  activity: StudentActivityDetail;
  onBack?: string;
}) {
  const [status, setStatus] = useState(activity.status);
  const [remark, setRemark] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleSubmit = async () => {
    if (!selectedFileName && !remark) {
       toast.error("Anexe um arquivo ou insira uma observação.");
       return;
    }
    
    try {
      await studentActivitiesService.submitActivity(activity.id, { remark, fileName: selectedFileName });
      setStatus('SUBMITTED');
      toast.success("Atividade enviada com sucesso!");
    } catch {
      toast.error("Erro ao enviar atividade.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
       setSelectedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link href={onBack || "/portal/aluno/atividades"} className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para Atividades
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
           <div>
             <div className="flex items-center gap-3 mb-2">
               {status === 'PENDING' && <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-200">Pendente</Badge>}
               {status === 'SUBMITTED' && <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Enviada</Badge>}
               {status === 'GRADED' && <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200">Corrigida</Badge>}
               {status === 'OVERDUE' && <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Atrasada</Badge>}
               <span className="text-sm font-medium text-slate-500">{activity.courseName}</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-900 leading-tight">{activity.title}</h1>
           </div>
           
           <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-4 text-sm whitespace-nowrap">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Prazo</p>
                <p className="font-bold text-slate-900 flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {new Date(activity.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Valor</p>
                <p className="font-bold text-slate-900">{activity.maxScore} pts</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm">
               <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">Instruções</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm">
                     <p>{activity.description}</p>
                  </div>

                  {(activity.attachments?.length ?? 0) > 0 && (
                     <div className="mt-8 border-t border-slate-100 pt-6">
                        <h4 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">
                           <Paperclip className="h-4 w-4 text-slate-400" />
                           Arquivos do Professor
                        </h4>
                        <div className="flex flex-col gap-2">
                           {activity.attachments?.map((file, idx) => (
                             <a key={idx} href={file.url} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                   <div className="p-2 bg-indigo-100 text-indigo-600 rounded">
                                      <FileText className="h-4 w-4" />
                                   </div>
                                   <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 truncate">{file.name}</span>
                                </div>
                                <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                             </a>
                           ))}
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            {status === 'GRADED' && (
               <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm">
                  <CardContent className="p-6">
                     <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        Resultado e Feedback
                     </h3>
                     <div className="flex items-center gap-4 mb-4 pb-4 border-b border-emerald-100">
                        <div className="bg-white px-4 py-2 rounded-lg border border-emerald-200 shadow-sm">
                           <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Nota Final</p>
                           <p className="text-2xl font-bold text-emerald-700">{activity.score} <span className="text-sm font-medium text-emerald-600/70">/ {activity.maxScore}</span></p>
                        </div>
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-slate-800 mb-2">Feedback do Professor:</p>
                        <p className="text-sm text-slate-600 bg-white p-4 rounded-lg border border-emerald-100 leading-relaxed italic">
                           &quot;{activity.feedback || 'Bom trabalho.'}&quot;
                        </p>
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>

         <div className="md:col-span-1 space-y-6">
            <Card className={`border-slate-200 shadow-sm ${(status === 'PENDING' || status === 'OVERDUE') ? 'border-t-4 border-t-indigo-500' : ''}`}>
               <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">Seu Envio</h3>
                  
                  {status === 'PENDING' || status === 'OVERDUE' ? (
                     <div className="space-y-5">
                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-2">Arquivo da Atividade (opcional)</label>
                           <div 
                             className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
                             onClick={() => fileInputRef.current?.click()}
                           >
                              <div className="mx-auto w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                 <UploadCloud className="w-5 h-5" />
                              </div>
                              <p className="text-sm font-medium text-slate-900 mb-1">{selectedFileName ? selectedFileName : 'Clique para selecionar'}</p>
                              <p className="text-xs text-slate-500">PDF, DOC, ZIP (Máx. 50MB)</p>
                              <input 
                                type="file" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleFileChange}
                              />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-2">Observações (opcional)</label>
                           <Textarea 
                             placeholder="Escreva algo para o professor..." 
                             className="min-h-[100px] resize-y text-sm"
                             value={remark}
                             onChange={e => setRemark(e.target.value)}
                           />
                        </div>

                        <Button className="w-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSubmit}>
                           Enviar Atividade
                        </Button>
                     </div>
                  ) : (
                     <div className="text-center py-6">
                        <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                           <CheckCircle className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">Atividade Enviada!</h4>
                        <p className="text-sm text-slate-500 mb-6">Seu arquivo foi recebido e aguarda correção.</p>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-sm text-left">
                           <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                              <span className="font-medium text-slate-700 truncate">meu_trabalho.pdf</span>
                           </div>
                           <span className="text-slate-400 text-xs shrink-0 pl-2">2.4 MB</span>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
