"use client";

import { Quiz, QuizAttempt } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

interface StudentQuizResultsProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onBack: () => void;
}

export function StudentQuizResults({ quiz, attempt, onBack }: StudentQuizResultsProps) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <Button onClick={onBack} variant="ghost" size="icon" className="text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Resultado: {quiz.title}</h2>
          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
             <span>Data: {new Date(attempt.completedAt || attempt.startedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
         <h3 className="text-slate-500 font-medium mb-2">Sua Pontuação</h3>
         <div className="text-5xl font-extrabold text-indigo-600 mb-4">{attempt.score !== undefined ? `${attempt.score}%` : 'Pendente'}</div>
         {attempt.score !== undefined ? (
           attempt.score >= 70 ? (
              <p className="text-emerald-600 font-semibold bg-emerald-50 py-2 px-4 rounded-full inline-block">Ótimo desempenho!</p>
           ) : (
              <p className="text-amber-600 font-semibold bg-amber-50 py-2 px-4 rounded-full inline-block">Pode melhorar.</p>
           )
         ) : (
           <p className="text-slate-600 font-semibold bg-slate-100 py-2 px-4 rounded-full inline-block">Aguardando correção do professor</p>
         )}
      </div>

      <div className="space-y-6">
         <h3 className="font-bold text-slate-900 text-lg">Revisão das Questões</h3>
         
         {quiz.questions.map((q, index) => {
            const isObjective = q.type === 'OBJECTIVE' || q.type === 'TRUE_FALSE';
            const studentAnswer = attempt.answers[q.id];
            const correctOption = q.options?.find(o => o.isCorrect)?.id;
            const isCorrect = isObjective ? studentAnswer === correctOption : null;

            return (
               <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-start gap-4">
                     <div className={`flex-shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm ${
                        isObjective 
                           ? isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                           : 'bg-slate-100 text-slate-700'
                     }`}>
                        {index + 1}
                     </div>
                     <div className="flex-1 pt-1 space-y-2">
                        <p className="font-semibold text-slate-800 text-base">{q.text}</p>
                        
                        {isObjective && (
                           <div className="space-y-2 mt-4 inline-block w-full">
                              {q.options.map(opt => {
                                 const isSelected = studentAnswer === opt.id;
                                 const isActuallyCorrect = opt.isCorrect;
                                 
                                 let bgClass = "bg-slate-50 border-slate-200 text-slate-600";
                                 let icon = null;

                                 if (isActuallyCorrect) {
                                    bgClass = "bg-emerald-50 border-emerald-200 text-emerald-800";
                                    icon = <CheckCircle className="h-4 w-4 text-emerald-600" />;
                                 } else if (isSelected && !isActuallyCorrect) {
                                    bgClass = "bg-red-50 border-red-200 text-red-800";
                                    icon = <XCircle className="h-4 w-4 text-red-600" />;
                                 }

                                 return (
                                    <div key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border ${bgClass}`}>
                                       <div className="w-4 flex justify-center">{icon}</div>
                                       <span className="flex-1 text-sm font-medium">{opt.text}</span>
                                       {isSelected && <span className="text-[10px] font-bold uppercase bg-white/50 px-2 py-0.5 rounded ml-2">Sua Resposta</span>}
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                        
                        {!isObjective && (
                           <div className="mt-4 p-4 rounded-lg border border-slate-200 bg-slate-50">
                              <span className="text-xs font-bold text-slate-400 uppercase mb-2 block">Sua Resposta (Dissertativa)</span>
                              <p className="text-sm text-slate-700">{studentAnswer || "Não respondida."}</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )
         })}
      </div>
    </div>
  );
}
