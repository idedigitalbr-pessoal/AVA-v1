"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Edit, Copy, Trash2, Check, X, FileText, LayoutList } from "lucide-react";
import { TeacherBankQuestion, QuestionType, QuestionDifficulty, QuestionStatus } from "@/types";
import { QuestionFormModal } from "./components/QuestionFormModal";
import { Subject } from "@/types";
import { ApiService } from "@/lib/api";
import { toast } from "sonner";

export function TeacherQuestionBank() {
  const [questions, setQuestions] = useState<TeacherBankQuestion[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  const [filterDifficulty, setFilterDifficulty] = useState("ALL");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<TeacherBankQuestion | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const qs = await ApiService.teachers.getQuestions();
        const subs = await ApiService.subjects.getAll();
        setQuestions(qs);
        setSubjects(subs);
      } catch (e) {
        toast.error("Erro ao carregar dados.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (q: TeacherBankQuestion) => {
    setEditingQuestion(q);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta questão?")) return;
    try {
      await ApiService.teachers.deleteQuestion(id);
      setQuestions(q => q.filter(x => x.id !== id));
      toast.success("Questão excluída com sucesso.");
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const q = await ApiService.teachers.duplicateQuestion(id);
      const original = questions.find(x => x.id === id);
      if (original) {
        setQuestions([{ ...original, id: q.id, text: original.text + " (Cópia)" }, ...questions]);
        toast.success("Questão duplicada.");
      }
    } catch {
      toast.error("Erro ao duplicar.");
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingQuestion) {
        const updated = await ApiService.teachers.updateQuestion(editingQuestion.id, data);
        setQuestions(questions.map(q => q.id === updated.id ? updated : q));
        toast.success("Questão atualizada.");
      } else {
        const created = await ApiService.teachers.createQuestion(data);
        setQuestions([created, ...questions]);
        toast.success("Questão criada.");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Erro ao salvar questão.");
    }
  };

  const filteredQuestions = questions.filter(q => {
    const s = search.toLowerCase();
    const matchSearch = q.text.toLowerCase().includes(s) || q.tags.some(t => t.toLowerCase().includes(s));
    const matchSub = filterSubject === "ALL" || q.subjectId === filterSubject;
    const matchType = filterType === "ALL" || q.type === filterType;
    const matchDiff = filterDifficulty === "ALL" || q.difficulty === filterDifficulty;
    return matchSearch && matchSub && matchType && matchDiff;
  });

  const getTypeLabel = (t: string) => {
    switch (t) {
      case 'MULTIPLE_CHOICE': return 'Múltipla Escolha';
      case 'TRUE_FALSE': return 'Verdadeiro/Falso';
      case 'ESSAY': return 'Dissertativa';
      default: return t;
    }
  };

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'EASY': return 'bg-emerald-100 text-emerald-700';
      case 'MEDIUM': return 'bg-amber-100 text-amber-700';
      case 'HARD': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getDifficultyLabel = (d: string) => {
    switch(d) {
      case 'EASY': return 'Fácil';
      case 'MEDIUM': return 'Média';
      case 'HARD': return 'Difícil';
      default: return d;
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Carregando banco de questões...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Banco de Questões</h1>
          <p className="text-slate-500 mt-1">Gerencie suas questões para usar em atividades e avaliações.</p>
        </div>
        <Button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700 shadow-sm text-white font-medium">
          <Plus className="mr-2 h-4 w-4" /> Nova Questão
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar por enunciado ou tag..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-slate-200 shadow-sm"
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={filterSubject} onValueChange={(val) => setFilterSubject(val || 'ALL')}>
            <SelectTrigger className="border-slate-200 shadow-sm">
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas Disciplinas</SelectItem>
              {subjects.map(s => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[180px]">
          <Select value={filterType} onValueChange={(val) => setFilterType(val || 'ALL')}>
            <SelectTrigger className="border-slate-200 shadow-sm">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os Tipos</SelectItem>
              <SelectItem value="MULTIPLE_CHOICE">Múltipla Escolha</SelectItem>
              <SelectItem value="TRUE_FALSE">Verdadeiro/Falso</SelectItem>
              <SelectItem value="ESSAY">Dissertativa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[150px]">
          <Select value={filterDifficulty} onValueChange={(val) => setFilterDifficulty(val || 'ALL')}>
            <SelectTrigger className="border-slate-200 shadow-sm">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Dificuldade</SelectItem>
              <SelectItem value="EASY">Fácil</SelectItem>
              <SelectItem value="MEDIUM">Média</SelectItem>
              <SelectItem value="HARD">Difícil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 shadow-sm">
            <LayoutList className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-lg font-medium text-slate-700">Nenhuma questão encontrada</p>
            <p>Ajuste os filtros ou crie uma nova questão.</p>
          </div>
        ) : (
          filteredQuestions.map(q => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex gap-2 items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{q.subjectName || 'Geral'}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-xs font-medium text-slate-600">{getTypeLabel(q.type)}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getDifficultyColor(q.difficulty)}`}>
                      {getDifficultyLabel(q.difficulty)}
                    </span>
                    {q.status === 'DRAFT' && <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">RASCUNHO</span>}
                  </div>
                  <p className="text-slate-900 font-medium whitespace-pre-wrap">{q.text}</p>
                  
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {q.tags.map(t => (
                      <span key={t} className="text-[10px] text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(q)} className="h-8 border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50">
                    <Edit className="w-3.5 h-3.5 mr-1.5"/> Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDuplicate(q.id)} className="h-8 border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50">
                    <Copy className="w-3.5 h-3.5 mr-1.5"/> Duplicar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(q.id)} className="h-8 border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 px-2">
                    <Trash2 className="w-3.5 h-3.5"/>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <QuestionFormModal 
          question={editingQuestion} 
          subjects={subjects} 
          onSave={handleSave} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

    </div>
  );
}
