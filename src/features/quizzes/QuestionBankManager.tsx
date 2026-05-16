"use client";

import { useState } from "react";
import { QuizQuestion } from "./types";
import { QuestionEditor } from "./QuestionEditor";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Edit2, Trash2, Filter } from "lucide-react";
import { useQuizStore } from "./store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function QuestionBankManager() {
  const store = useQuizStore();
  const questions = store.questions;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | Partial<QuizQuestion> | null>(null);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.text?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || q.subject === filterSubject;
    const matchesLevel = filterLevel === "all" || q.level === filterLevel;
    const matchesCategory = filterCategory === "all" || q.category === filterCategory;

    return matchesSearch && matchesSubject && matchesLevel && matchesCategory;
  });

  const uniqueSubjects = Array.from(new Set(questions.map(q => q.subject).filter(Boolean)));
  const uniqueCategories = Array.from(new Set(questions.map(q => q.category).filter(Boolean)));

  const handleCreate = () => {
    setEditingQuestion({});
  };

  const handleEdit = (question: QuizQuestion) => {
    setEditingQuestion(question);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta questão?")) {
      store.deleteQuestion(id);
    }
  };

  const handleSave = (question: QuizQuestion) => {
    if (questions.find(q => q.id === question.id)) {
      store.updateQuestion(question);
    } else {
      store.addQuestion({ ...question, id: Date.now().toString() });
    }
    setEditingQuestion(null);
  };

  if (editingQuestion !== null) {
    return <QuestionEditor question={editingQuestion} onSave={handleSave} onCancel={() => setEditingQuestion(null)} />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Banco de Questões</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie questões para utilizar em avaliações.</p>
      </div>

      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
               placeholder="Buscar questão..." 
               className="pl-9" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCreate} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Questão
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center text-sm font-medium text-slate-500 mr-2">
            <Filter className="w-4 h-4 mr-2" />
            Filtros:
          </div>
          
          <Select value={filterSubject} onValueChange={(v) => setFilterSubject(v || "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Disciplinas</SelectItem>
              {uniqueSubjects.map(sub => (
                <SelectItem key={sub!} value={sub!}>{sub}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v || "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              {uniqueCategories.map(cat => (
                <SelectItem key={cat!} value={cat!}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterLevel} onValueChange={(v) => setFilterLevel(v || "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Dificuldades</SelectItem>
              <SelectItem value="Fácil">Fácil</SelectItem>
              <SelectItem value="Médio">Médio</SelectItem>
              <SelectItem value="Difícil">Difícil</SelectItem>
            </SelectContent>
          </Select>

          {(filterSubject !== 'all' || filterCategory !== 'all' || filterLevel !== 'all') && (
            <Button variant="ghost" size="sm" onClick={() => {
              setFilterSubject('all');
              setFilterCategory('all');
              setFilterLevel('all');
            }}>
              Limpar Filtros
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
             <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead className="text-right">Ação</TableHead>
             </TableRow>
          </TableHeader>
          <TableBody>
             {filteredQuestions.map((q) => (
               <TableRow key={q.id}>
                 <TableCell className="font-medium text-slate-900">{q.title}</TableCell>
                 <TableCell className="text-slate-500">{q.subject}</TableCell>
                 <TableCell className="text-slate-500">{q.category}</TableCell>
                 <TableCell className="text-slate-500 text-sm">
                   {q.type === 'OBJECTIVE' ? 'Múltipla Escolha' : 
                    q.type === 'TRUE_FALSE' ? 'Verdadeiro/Falso' : 'Dissertativa'}
                 </TableCell>
                 <TableCell>
                    <Badge variant="outline" className={
                      q.level === 'Fácil' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                      q.level === 'Médio' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                      'text-red-600 border-red-200 bg-red-50'
                    }>
                       {q.level}
                    </Badge>
                 </TableCell>
                 <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                       <Button onClick={() => handleEdit(q as QuizQuestion)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                          <Edit2 className="h-4 w-4" />
                       </Button>
                       <Button onClick={() => handleDelete(q.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                 </TableCell>
               </TableRow>
             ))}
             {filteredQuestions.length === 0 && (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                   Nenhuma questão encontrada.
                 </TableCell>
               </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
