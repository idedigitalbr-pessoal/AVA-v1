"use client";

import { useState } from "react";
import { Quiz, QuizAttempt } from "./types";
import { StudentQuizViewer } from "./StudentQuizViewer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuizStore } from "./store";
import { useAuth } from "@/lib/auth/AuthContext";

export function StudentQuizList() {
  const store = useQuizStore();
  const { user } = useAuth();
  const studentId = user?.id || 'student_1';

  // For this mock, we pretend the student has access to all PUBLISHED quizzes.
  // In reality, it would filter by enrolled courses.
  const quizzes = store.quizzes.filter(q => q.status === 'PUBLISHED');
  const attempts = store.attempts.filter(a => a.studentId === studentId);

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  if (currentQuiz) {
     return <StudentQuizViewer 
              quiz={currentQuiz} 
              studentId={studentId}
              onBack={() => setCurrentQuiz(null)} 
            />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meus Questionários</h1>
        <p className="text-slate-500 text-sm mt-1">Responda aos questionários avaliativos criados pelos seus professores.</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[300px]">Questionário</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Tentativas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Nota Obtida</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => {
                    const quizAttempts = attempts.filter(a => a.quizId === quiz.id && a.isFinished);
                    const highestScore = quizAttempts.length > 0 
                      ? Math.max(...quizAttempts.map(a => a.score || 0))
                      : null;
                    const hasCompleted = quizAttempts.length > 0;
                    const attemptsLeft = quiz.maxAttempts - quizAttempts.length;
                    
                    return (
                      <TableRow key={quiz.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{quiz.title}</p>
                              <p className="text-xs text-slate-500 mt-1 truncate max-w-[200px]">{quiz.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-slate-600">
                             <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1 pt-0.5"/> {quiz.durationMinutes} min</span>
                             <span className="text-xs text-slate-400">{quiz.questions.length} questões</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                           {quizAttempts.length} / {quiz.maxAttempts}
                        </TableCell>
                        <TableCell>
                          {!hasCompleted ? (
                            <Badge variant="warning" className="bg-amber-100 text-amber-800 border border-amber-200">Pendente</Badge>
                          ) : attemptsLeft > 0 ? (
                            <Badge variant="success" className="bg-blue-100 text-blue-800 border border-blue-200">Concluído Parcialmente</Badge>
                          ) : (
                            <Badge variant="success" className="bg-emerald-100 text-emerald-800 border border-emerald-200">Esgotado</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {highestScore !== null ? (
                             <div className="font-bold text-slate-900">
                               {highestScore}% <span className="text-slate-400 font-normal text-xs text-normal block">maior nota</span>
                             </div>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant={hasCompleted ? 'outline' : 'default'}
                            className={!hasCompleted ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-slate-600 border-slate-300'}
                            onClick={() => setCurrentQuiz(quiz)}
                          >
                            {hasCompleted ? 'Ver / Tentar de novo' : 'Acessar'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                      Nenhum questionário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
