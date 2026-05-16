"use client";

import { useState } from "react";
import { Quiz } from "./types";
import { QuizEditor } from "./QuizEditor";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit2, Trash2, Users } from "lucide-react";
import { useQuizStore } from "./store";

interface TeacherQuizManagerProps {
  courseId: string;
}

export function TeacherQuizManager({ courseId }: TeacherQuizManagerProps) {
  const store = useQuizStore();
  const quizzes = store.quizzes.filter(q => q.courseId === courseId);
  const [editingQuiz, setEditingQuiz] = useState<Partial<Quiz> | null>(null);

  const handleCreate = () => {
    setEditingQuiz({ courseId });
  };

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir o questionário?")) {
      store.deleteQuiz(id);
    }
  };

  const handleSave = (quiz: Partial<Quiz>) => {
    if (quiz.id) {
      store.updateQuiz(quiz as Quiz);
    } else {
      store.addQuiz({ ...quiz, id: Date.now().toString() } as Quiz);
    }
    setEditingQuiz(null);
  };

  if (editingQuiz) {
    return <QuizEditor 
             quiz={editingQuiz} 
             onSave={handleSave} 
             onCancel={() => setEditingQuiz(null)} 
           />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Questionários</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie os quizzes (&quot;avaliações objetivas&quot;) para seus alunos.</p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Questionário
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
             <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Questões</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Tentativas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
             </TableRow>
          </TableHeader>
          <TableBody>
             {quizzes.map((quiz) => (
               <TableRow key={quiz.id}>
                 <TableCell className="font-medium text-slate-900">{quiz.title}</TableCell>
                 <TableCell className="text-slate-500">{quiz.questions?.length || 0} questões</TableCell>
                 <TableCell className="text-slate-500">{quiz.durationMinutes} min</TableCell>
                 <TableCell className="text-slate-500">{quiz.maxAttempts}</TableCell>
                 <TableCell>
                    <Badge variant="outline" className={
                      quiz.status === 'PUBLISHED' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-slate-600 border-slate-200 bg-slate-50'
                    }>
                       {quiz.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                 </TableCell>
                 <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" title="Respostas (Mock)">
                          <Users className="h-4 w-4" />
                       </Button>
                       <Button onClick={() => handleEdit(quiz)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                          <Edit2 className="h-4 w-4" />
                       </Button>
                       <Button onClick={() => handleDelete(quiz.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                 </TableCell>
               </TableRow>
             ))}
             {quizzes.length === 0 && (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                   Nenhum questionário encontrado. Crie um para começar.
                 </TableCell>
               </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
