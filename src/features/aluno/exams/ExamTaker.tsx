"use client";

import { useState, useEffect, useCallback } from "react";
import { notFound, useRouter } from "next/navigation";
import { mockExams as MOCK_EXAMS } from "@/mocks/student.mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, Flag } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ExamTaker({ id }: { id: string }) {
  const router = useRouter();
  const exam = MOCK_EXAMS.find(e => e.id === id);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(exam?.durationMinutes ? exam.durationMinutes * 60 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    // Mock submission duration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
         // Na prática, a API atualizaria o status para CONCLUIDA.
         // Aqui, redirecionamos para o dashboard.
         router.push("/portal/aluno/provas-online");
      }, 3000);
    }, 2000);
  }, [router]);

  useEffect(() => {
    if (!exam || exam.status !== "DISPONIVEL" || !exam.questions) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam, handleSubmit]);

  if (!exam || exam.status !== "DISPONIVEL" || !exam.questions) {
     return (
       <div className="text-center py-20">
         <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
         <h2 className="text-2xl font-bold text-slate-800">Prova Inválida ou Indisponível</h2>
         <Button onClick={() => router.push("/portal/aluno/provas-online")} className="mt-6">Voltar</Button>
       </div>
     );
  }

  const questions = exam.questions;
  const currentQ = questions[currentQuestionIdx];
  const progressPercent = ((currentQuestionIdx + 1) / questions.length) * 100;
  
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (idx: number) => {
    setAnswers({ ...answers, [currentQ.id]: idx });
  };

  const toggleReview = () => {
    setMarkedForReview({ ...markedForReview, [currentQ.id]: !markedForReview[currentQ.id] });
  };

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto bg-white rounded-2xl border border-emerald-200 p-10 text-center animate-in zoom-in fade-in duration-500 shadow-2xl shadow-emerald-500/20">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-emerald-900 mb-2">Prova Enviada!</h2>
          <p className="text-emerald-700 text-lg mb-8">
            Suas respostas foram registradas com sucesso no sistema.
          </p>
          <Button onClick={() => router.push("/portal/aluno/provas-online")} className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 text-lg font-bold">
            Voltar para Provas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start h-full">
      
      {/* Main Content */}
      <div className="flex-1 w-full space-y-6">
        {/* Header/Timer */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between shadow-sm sticky top-20 z-10">
           <div>
             <h2 className="font-bold text-slate-800 line-clamp-1">{exam.title}</h2>
             <span className="text-xs text-slate-500">Questão {currentQuestionIdx + 1} de {questions.length}</span>
           </div>
           
           <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold font-mono text-lg ${timeLeft < 300 ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
             <Clock className="w-5 h-5" />
             {formatTime(timeLeft)}
           </div>
        </div>

        <Progress value={progressPercent} className="h-2 bg-slate-200" indicatorClassName="bg-indigo-600" />

        {/* Question Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
               <h3 className="text-xl font-medium text-slate-800 leading-relaxed">
                 <span className="font-bold text-indigo-600 mr-2">{currentQuestionIdx + 1}.</span>
                 {currentQ.text}
               </h3>
               <button 
                  onClick={toggleReview}
                  className={`shrink-0 p-2 rounded-lg transition-colors border ${markedForReview[currentQ.id] ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                  title="Marcar para revisão"
                >
                  <Flag className="w-5 h-5" fill={markedForReview[currentQ.id] ? "currentColor" : "none"} />
               </button>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-600/20' 
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      isSelected ? 'border-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-indigo-600" />}
                    </div>
                    <span className={`text-base ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between py-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIdx === 0}
            className="w-[120px]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
          </Button>

          {currentQuestionIdx === questions.length - 1 ? (
             <Button 
               onClick={handleSubmit} 
               disabled={isSubmitting || Object.keys(answers).length < questions.length - 2}
               className="bg-emerald-600 hover:bg-emerald-700 w-[160px] font-bold"
             >
               {isSubmitting ? "Enviando..." : "Finalizar Prova"}
             </Button>
          ) : (
            <Button 
              onClick={() => setCurrentQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
              className="bg-indigo-600 hover:bg-indigo-700 w-[120px]"
            >
              Próxima <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 bg-white border border-slate-200 p-4 rounded-xl shadow-sm sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h3 className="font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100 uppercase tracking-wider text-xs">Visão Geral</h3>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = currentQuestionIdx === idx;
            const isReview = markedForReview[q.id];
            
            let btnClass = "h-10 text-sm font-medium rounded-lg border-2 transition-colors relative ";
            
            if (isCurrent) {
              btnClass += "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm";
            } else if (isAnswered) {
              btnClass += "border-emerald-200 bg-emerald-50 text-emerald-700";
            } else {
              btnClass += "border-slate-200 bg-white text-slate-500 hover:bg-slate-50";
            }

            return (
              <button 
                key={q.id}
                onClick={() => setCurrentQuestionIdx(idx)}
                className={btnClass}
              >
                {idx + 1}
                {isReview && (
                  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-500 border-2 border-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-white border-2 border-slate-200 rounded-sm" /> Não respondida
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-emerald-50 border-2 border-emerald-200 rounded-sm" /> Respondida
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-white border-2 border-slate-200 rounded-full relative">
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
            </div> Para revisão
          </div>
        </div>
      </div>
    </div>
  );
}
