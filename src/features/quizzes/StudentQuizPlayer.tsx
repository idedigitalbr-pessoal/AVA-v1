"use client";

import { useState, useCallback, useEffect } from "react";
import { Quiz, QuizAttempt } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Save, FileText, CheckCircle, Circle, PlayCircle } from "lucide-react";
import { useQuizStore } from "./store";

interface StudentQuizPlayerProps {
  quiz: Quiz;
  activityId?: string;
  studentId: string;
  onFinish: (attemptId: string) => void;
  onBack: () => void;
}

export function StudentQuizPlayer({ quiz, activityId, studentId, onFinish, onBack }: StudentQuizPlayerProps) {
  const store = useQuizStore();
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(quiz.durationMinutes * 60);

  const calculateScore = useCallback(() => {
    let correct = 0;
    const gradedQuestions = quiz.questions.filter(q => q.type === 'OBJECTIVE' || q.type === 'TRUE_FALSE');
    if (gradedQuestions.length === 0) return 0; // If all essays, teacher grades it. Just 0 for now.

    quiz.questions.forEach(q => {
      if (q.type === 'OBJECTIVE' || q.type === 'TRUE_FALSE') {
        const correctOption = q.options.find(o => o.isCorrect)?.id;
        if (answers[q.id] === correctOption) correct++;
      }
    });

    return Math.round((correct / gradedQuestions.length) * 100);
  }, [quiz.questions, answers]);

  const doSubmit = useCallback(() => {
    if (attemptId) {
      const score = calculateScore();
      store.submitAttempt(attemptId, answers, score);
      onFinish(attemptId);
    }
  }, [attemptId, calculateScore, store, answers, onFinish]);

  const handleSubmit = useCallback(() => {
    if (confirm("Deseja realmente enviar suas respostas?")) {
      doSubmit();
    }
  }, [doSubmit]);

  useEffect(() => {
    if (!attemptId || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          doSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attemptId, timeLeft, doSubmit]);

  const handleStart = () => {
    const newAttemptId = store.startAttempt(quiz.id, studentId);
    setAttemptId(newAttemptId);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  if (!attemptId) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{quiz.title}</h2>
            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
               <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> Duração: {quiz.durationMinutes} min</span>
               <span>•</span>
               <span className="flex items-center"><FileText className="h-3.5 w-3.5 mr-1" /> Questões: {quiz.questions.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-6">
           <div className="mx-auto w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8" />
           </div>
           
           <div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Pronto para começar?</h3>
             <p className="text-slate-600 max-w-md mx-auto">{quiz.description}</p>
             <p className="text-amber-600 text-sm mt-4 font-medium px-4 py-2 bg-amber-50 rounded-lg inline-block text-left">
               ⚠️ O tempo começará a contar assim que você iniciar. Ao fim do período, suas respostas serão enviadas automaticamente.
             </p>
           </div>
           
           <div className="pt-4">
              <Button onClick={handleStart} size="lg" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                 <PlayCircle className="h-5 w-5 mr-2" /> Iniciar Questionário
              </Button>
           </div>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 60; // less than 1 minute

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 sticky top-4 z-10 shadow-sm">
        <div className="flex items-center gap-3">
           <span className="font-bold text-slate-900">Em progresso...</span>
           <span className={`${isLowTime ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'} text-xs font-bold px-2 py-0.5 rounded-full flex items-center`}>
              <Clock className="h-3 w-3 mr-1" /> {formatTime(timeLeft)}
           </span>
        </div>
        <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700">
           <Save className="h-4 w-4 mr-2" /> Finalizar e Enviar
        </Button>
      </div>

      <div className="space-y-6">
         {quiz.questions.map((q, index) => (
           <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                    {index + 1}
                 </div>
                 <div className="flex-1 pt-1">
                    <p className="font-semibold text-slate-800 text-base">{q.text}</p>
                 </div>
              </div>

              {q.type === 'OBJECTIVE' || q.type === 'TRUE_FALSE' ? (
                 <div className="pl-12 space-y-3">
                   {q.options.map((opt) => (
                     <button 
                       key={opt.id}
                       onClick={() => handleSelectOption(q.id, opt.id)}
                       className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                         answers[q.id] === opt.id 
                           ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900' 
                           : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                       }`}
                     >
                        <div className="mt-0.5 text-slate-400">
                          {answers[q.id] === opt.id ? <CheckCircle className="h-4 w-4 text-indigo-600" /> : <Circle className="h-4 w-4" />}
                        </div>
                        <span className="flex-1 text-sm font-medium">{opt.text}</span>
                     </button>
                   ))}
                 </div>
              ) : (
                 <div className="pl-12">
                   <textarea 
                     value={answers[q.id] || ""}
                     onChange={e => handleSelectOption(q.id, e.target.value)}
                     className="w-full h-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                     placeholder="Digite sua resposta aqui..."
                   />
                 </div>
              )}
           </div>
         ))}
      </div>
    </div>
  );
}
