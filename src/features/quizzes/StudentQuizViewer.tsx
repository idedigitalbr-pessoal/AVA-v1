"use client";

import { useState } from "react";
import { Quiz, QuizAttempt } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StudentQuizPlayer } from "./StudentQuizPlayer";
import { StudentQuizResults } from "./StudentQuizResults";
import { PlayCircle, Eye, Clock, FileText } from "lucide-react";
import { useQuizStore } from "./store";

interface StudentQuizViewerProps {
  quiz: Quiz;
  studentId: string;
  onBack: () => void;
}

export function StudentQuizViewer({ quiz, studentId, onBack }: StudentQuizViewerProps) {
  const store = useQuizStore();
  const attempts = store.attempts.filter(a => a.quizId === quiz.id && a.studentId === studentId);
  const finishedAttempts = attempts.filter(a => a.isFinished);
  
  const [viewState, setViewState] = useState<'HOME' | 'PLAYING' | 'RESULTS'>('HOME');
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);

  const attemptsLeft = quiz.maxAttempts - finishedAttempts.length;

  const handleStart = () => setViewState('PLAYING');

  const handleFinishQuiz = (attemptId: string) => {
    // Attempt is already updated in store via StudentQuizPlayer
    const updatedAttempt = store.attempts.find(a => a.id === attemptId);
    if (updatedAttempt) {
      setCurrentAttempt(updatedAttempt);
      setViewState('RESULTS');
    } else {
      setViewState('HOME');
    }
  };

  const handleViewAttempt = (attempt: QuizAttempt) => {
    setCurrentAttempt(attempt);
    setViewState('RESULTS');
  };

  if (viewState === 'PLAYING') {
    return <StudentQuizPlayer quiz={quiz} studentId={studentId} onFinish={handleFinishQuiz} onBack={() => setViewState('HOME')} />;
  }

  if (viewState === 'RESULTS' && currentAttempt) {
    return <StudentQuizResults quiz={quiz} attempt={currentAttempt} onBack={() => setViewState('HOME')} />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Button onClick={onBack} variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600">
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{quiz.title}</h2>
          <p className="text-sm text-slate-500 mt-1">{quiz.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Detalhes</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>Duração: <strong>{quiz.durationMinutes} minutos</strong></span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4" />
                    <span>Questões: <strong>{quiz.questions.length}</strong></span>
                 </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                 {attemptsLeft > 0 ? (
                   <Button onClick={handleStart} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <PlayCircle className="mr-2 h-4 w-4" /> Iniciar Tentativa ({attemptsLeft} restando)
                   </Button>
                 ) : (
                   <div className="text-center text-sm font-medium text-red-600 bg-red-50 p-2 rounded-md">
                      Fim das tentativas permitidas
                   </div>
                 )}
              </div>
           </div>
        </div>

        <div className="md:col-span-2 space-y-6">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                 <h3 className="font-bold text-slate-900">Histórico de Tentativas</h3>
              </div>
              <Table>
                 <TableHeader>
                    <TableRow>
                       <TableHead>Data</TableHead>
                       <TableHead>Pontuação</TableHead>
                       <TableHead>Status</TableHead>
                       <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {finishedAttempts.length > 0 ? (
                       finishedAttempts.map((attempt) => (
                          <TableRow key={attempt.id}>
                             <TableCell className="text-sm text-slate-700 font-medium">
                                {new Date(attempt.completedAt || attempt.startedAt).toLocaleString()}
                             </TableCell>
                             <TableCell>
                                <span className="font-bold text-indigo-700">
                                  {attempt.score !== undefined ? `${attempt.score}%` : 'Pendente'}
                                </span>
                             </TableCell>
                             <TableCell>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Concluído</Badge>
                             </TableCell>
                             <TableCell className="text-right">
                                <Button onClick={() => handleViewAttempt(attempt)} variant="ghost" size="sm" className="text-indigo-600">
                                   <Eye className="h-4 w-4 mr-2" /> Revisar
                                </Button>
                             </TableCell>
                          </TableRow>
                       ))
                    ) : (
                       <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                             Você ainda não realizou nenhuma tentativa completa.
                          </TableCell>
                       </TableRow>
                    )}
                 </TableBody>
              </Table>
           </div>
        </div>
      </div>
    </div>
  );
}

// Just an icon wrapper
function ArrowLeftIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  )
}
