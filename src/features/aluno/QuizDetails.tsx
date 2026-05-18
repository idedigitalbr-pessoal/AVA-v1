"use client";

import { StudentActivityDetail } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, ChevronLeft, AlertCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { studentActivitiesService } from "@/lib/api/services/student-activities.service";

const mockQuestions = [
  { id: 1, text: "O que é TypeScript?", options: ["Um banco de dados", "Um superconjunto de JavaScript", "Um framework CSS", "Uma biblioteca de UI"] },
  { id: 2, text: "Qual hook é usado para gerenciar estado no React?", options: ["useEffect", "useMemo", "useState", "useContext"] },
  { id: 3, text: "O Next.js é focado principalmente em:", options: ["Mobile apps", "Desenvolvimento backend", "Aplicações React com renderização no servidor", "Apenas APIs REST"] },
];

export function QuizDetails({
  activity,
  onBack,
  isExam = false
}: {
  activity: StudentActivityDetail;
  onBack?: string;
  isExam?: boolean;
}) {
  const [status, setStatus] = useState(activity.status);
  const [started, setStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(isExam ? 3600 : 1800); // 1h ou 30m
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (started && status === 'PENDING' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, status, timeLeft]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < mockQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if passed all
    if (Object.keys(answers).length < mockQuestions.length) {
      if (!confirm("Você tem perguntas não respondidas! Tem certeza que deseja enviar?")) {
        return;
      }
    }

    try {
      await studentActivitiesService.submitActivity(activity.id, { answers });
      setStatus('SUBMITTED');
      toast.success(isExam ? "Prova enviada com sucesso!" : "Questionário enviado com sucesso!");
    } catch {
      toast.error("Erro ao enviar.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (status === 'SUBMITTED' || status === 'GRADED') {
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
                 {status === 'SUBMITTED' && <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Enviado</Badge>}
                 {status === 'GRADED' && <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200">Corrigido</Badge>}
                 <span className="text-sm font-medium text-slate-500">{activity.courseName}</span>
               </div>
               <h1 className="text-2xl font-bold text-slate-900 leading-tight">{activity.title}</h1>
             </div>
          </div>
        </div>

        <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm text-center py-12">
           <CardContent>
              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Respostas Registradas!</h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8">
                {status === 'GRADED' 
                  ? "Sua nota já foi calculada e está disponível abaixo." 
                  : "Suas respostas foram enviadas e estão aguardando correção ou liberação do gabarito."}
              </p>

              {status === 'GRADED' && (
                <div className="inline-block bg-white px-8 py-4 rounded-2xl border border-emerald-200 shadow-sm">
                   <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Nota Final</p>
                   <p className="text-4xl font-bold text-emerald-700">{activity.score} <span className="text-xl font-medium text-emerald-600/70">/ {activity.maxScore}</span></p>
                </div>
              )}
           </CardContent>
        </Card>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <Link href={onBack || "/portal/aluno/atividades"} className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para {isExam ? 'Provas' : 'Atividades'}
          </Link>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
             <div>
               <div className="flex items-center gap-3 mb-2">
                 <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-200">Pendente</Badge>
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

        <Card className="border-slate-200 shadow-sm text-center py-16">
          <CardContent>
            <div className="mx-auto w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
               {isExam ? <AlertCircle className="w-10 h-10" /> : <PlayCircle className="w-10 h-10" />}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Pronto para começar?</h2>
            <div className="text-slate-600 max-w-lg mx-auto mb-8 space-y-4">
              <p>{activity.description || "Responda as questões com atenção."}</p>
              <ul className="text-sm text-left bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
                 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Este teste contém {mockQuestions.length} questões.</li>
                 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> O tempo estimado é de {formatTime(isExam ? 3600 : 1800)}.</li>
                 <li className="flex gap-2"><AlertCircle className="w-4 h-4 text-amber-500 shrink-0" /> Uma vez iniciado, você deve ir até o final.</li>
                 {isExam && <li className="flex gap-2"><AlertCircle className="w-4 h-4 text-red-500 shrink-0" /> Monitoramento antifraude ativado para esta prova.</li>}
              </ul>
            </div>
            <Button size="lg" className="font-bold bg-indigo-600 hover:bg-indigo-700 text-white min-w-[200px]" onClick={handleStart}>
               Iniciar {isExam ? "Prova" : "Questionário"} Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = mockQuestions[currentQuestionIdx];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-4 z-10">
        <div>
           <h2 className="font-bold text-slate-900 truncate max-w-xs">{activity.title}</h2>
           <p className="text-xs text-slate-500 font-medium">Questão {currentQuestionIdx + 1} de {mockQuestions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg flex items-center gap-2 ${timeLeft < 300 ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
            <Clock className="w-5 h-5 opacity-70" /> {formatTime(timeLeft)}
          </div>
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSubmit}>
            Entregar
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         {/* Main Question Area */}
         <div className="flex-1 space-y-6">
            <Card className="border-slate-200 shadow-sm border-t-4 border-t-indigo-500 min-h-[400px] flex flex-col">
               <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="mb-8">
                     <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-lg mb-4">
                        Questão {currentQuestionIdx + 1}
                     </span>
                     <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
                        {currentQ.text}
                     </h3>
                  </div>

                  <div className="space-y-3 mt-auto">
                     {currentQ.options.map((opt, idx) => {
                        const isSelected = answers[currentQuestionIdx] === idx;
                        return (
                          <div 
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                              isSelected 
                                ? 'border-indigo-600 bg-indigo-50/50' 
                                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                            }`}
                          >
                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                               isSelected ? 'border-indigo-600' : 'border-slate-300'
                             }`}>
                                {isSelected && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                             </div>
                             <span className={`text-base ${isSelected ? 'font-medium text-indigo-900' : 'text-slate-700'}`}>
                               {opt}
                             </span>
                          </div>
                        )
                     })}
                  </div>
               </CardContent>
            </Card>

            <div className="flex justify-between items-center">
               <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIdx === 0}>
                  Anterior
               </Button>
               {currentQuestionIdx < mockQuestions.length - 1 ? (
                 <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleNext}>
                    Próxima Questão
                 </Button>
               ) : (
                 <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>
                    Revisar e Entregar
                 </Button>
               )}
            </div>
         </div>

         {/* Navigation Map */}
         <div className="w-full md:w-64 shrink-0">
            <Card className="border-slate-200 shadow-sm sticky top-24">
               <CardContent className="p-5">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Navegação</h4>
                  <div className="grid grid-cols-4 gap-2">
                     {mockQuestions.map((_, idx) => {
                       const isAnswered = answers[idx] !== undefined;
                       const isCurrent = currentQuestionIdx === idx;
                       return (
                         <button 
                           key={idx}
                           onClick={() => setCurrentQuestionIdx(idx)}
                           className={`h-10 rounded-lg text-sm font-semibold transition-all border-2 ${
                             isCurrent 
                               ? 'border-indigo-600 ring-2 ring-indigo-200 ring-offset-1 text-indigo-700 bg-indigo-50' 
                               : isAnswered 
                                 ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                 : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                           }`}
                         >
                            {idx + 1}
                         </button>
                       )
                     })}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
