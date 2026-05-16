"use client";

import { notFound, useRouter } from "next/navigation";
import { MOCK_EXAMS } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, Target } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export function ExamResult({ id }: { id: string }) {
  const router = useRouter();
  const exam = MOCK_EXAMS.find(e => e.id === id);

  if (!exam || exam.status !== "CONCLUIDA" || exam.score === undefined) {
     return (
       <div className="text-center py-20">
         <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
         <h2 className="text-2xl font-bold text-slate-800">Resultado Indisponível</h2>
         <p className="text-slate-500 mt-2">Esta prova não foi concluída ou o resultado ainda não foi liberado.</p>
         <Button onClick={() => router.push("/portal/aluno/provas-online")} className="mt-6">Voltar</Button>
       </div>
     );
  }

  const percentage = (exam.score / exam.maxScore) * 100;
  const isApproved = percentage >= 70;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
       <div>
         <Link href="/portal/aluno/provas-online" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
         </Link>
       </div>

       <Card className="border-slate-200 shadow-sm overflow-hidden text-center p-8 bg-white">
         <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-slate-50">
           {isApproved ? (
             <div className="w-full h-full bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
               <CheckCircle2 className="w-10 h-10" />
             </div>
           ) : (
             <div className="w-full h-full bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
               <Target className="w-10 h-10" />
             </div>
           )}
         </div>

         <div className="mb-8 space-y-2">
           <h2 className="text-3xl font-black text-slate-900">{exam.title}</h2>
           <p className="text-slate-500 font-medium text-lg">{exam.discipline}</p>
         </div>

         <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-12 max-w-xl mx-auto">
            <div className="text-center">
              <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Nota Final</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-5xl font-black ${isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {exam.score.toFixed(1)}
                </span>
                <span className="text-xl font-bold text-slate-400">/ {exam.maxScore}</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-20 bg-slate-200" />
            <div className="w-full sm:hidden h-px bg-slate-200" />

            <div className="text-center w-full sm:w-auto">
               <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Aproveitamento</span>
               <div className="space-y-2">
                 <Progress value={percentage} className="h-3 w-40 mx-auto bg-slate-200" indicatorClassName={isApproved ? 'bg-emerald-500' : 'bg-amber-500'} />
                 <span className="font-bold text-slate-700">{percentage.toFixed(0)}%</span>
               </div>
            </div>
         </div>

         <div className="mt-8 pt-8 border-t border-slate-100">
           <h3 className="font-bold text-slate-800 mb-4">Feedback do Sistema</h3>
           <p className="text-slate-600 max-w-md mx-auto">
             {isApproved 
               ? "Parabéns! Você alcançou a nota necessária para aprovação. O resultado já consta no seu boletim oficial." 
               : "Você não atingiu a média necessária nesta avaliação. Recomendamos revisar o material e aguardar informações sobre possíveis avaliações substitutivas."
             }
           </p>
         </div>
       </Card>
    </div>
  );
}
