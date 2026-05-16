"use client";

import { useState, useMemo } from "react";
import { Quiz, QuizQuestion } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Plus, Trash2, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useQuizStore } from "./store";

interface QuizEditorProps {
  quiz?: Partial<Quiz>;
  onSave: (quiz: Partial<Quiz>) => void;
  onCancel: () => void;
}

export function QuizEditor({ quiz, onSave, onCancel }: QuizEditorProps) {
  const store = useQuizStore();
  const availableQuestions = store.questions;

  const [title, setTitle] = useState(quiz?.title || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const [durationMinutes, setDurationMinutes] = useState(quiz?.durationMinutes?.toString() || "30");
  const [maxAttempts, setMaxAttempts] = useState(quiz?.maxAttempts?.toString() || "1");
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>(quiz?.status || 'DRAFT');
  
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>(quiz?.questions || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = useMemo(() => {
    return availableQuestions.filter(q => 
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableQuestions, searchTerm]);

  const handleAddQuestion = (q: QuizQuestion) => {
    if (!selectedQuestions.find(sq => sq.id === q.id)) {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const handleRemoveQuestion = (id: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    onSave({
      ...quiz,
      title,
      description,
      durationMinutes: parseInt(durationMinutes) || 30,
      maxAttempts: parseInt(maxAttempts) || 1,
      status,
      questions: selectedQuestions
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <Button onClick={onCancel} variant="ghost" size="icon" className="text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{quiz?.id ? "Editar Questionário" : "Novo Questionário"}</h2>
            <p className="text-sm text-slate-500">Configure o quiz e selecione as questões.</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="mr-2 h-4 w-4" /> Salvar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Título do Questionário</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Avaliação Final" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">Instruções</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full h-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Ex: Leia atentamente antes de responder..."
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
             <h3 className="text-sm font-semibold text-slate-800 mb-2">Questões Selecionadas ({selectedQuestions.length})</h3>
             
             {selectedQuestions.length > 0 ? (
                <div className="space-y-2">
                   {selectedQuestions.map((q, idx) => (
                      <div key={q.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                         <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-400 text-sm w-4">{idx + 1}.</span>
                            <span className="font-medium text-slate-700 text-sm">{q.title}</span>
                            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                              {q.type === 'OBJECTIVE' ? 'Objetiva' : q.type === 'TRUE_FALSE' ? 'V/F' : 'Dissertativa'}
                            </span>
                         </div>
                         <Button onClick={() => handleRemoveQuestion(q.id)} variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                         </Button>
                      </div>
                   ))}
                </div>
             ) : (
                <div className="p-6 text-center border border-dashed border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-sm">
                   Nenhuma questão selecionada. Utilize o banco ao lado para adicionar.
                </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Configurações</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Duração (min)</label>
                <Input type="number" min="1" value={durationMinutes} onChange={e => setDurationMinutes(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Tentativas Máx.</label>
                <Input type="number" min="1" value={maxAttempts} onChange={e => setMaxAttempts(e.target.value)} />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900">Publicado</h4>
                  <p className="text-xs text-slate-500">Alunos poderão acessar</p>
                </div>
                <Switch 
                  checked={status === 'PUBLISHED'} 
                  onCheckedChange={c => setStatus(c ? 'PUBLISHED' : 'DRAFT')} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
             <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Banco de Questões</h3>
             
             <div className="relative w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
               <Input 
                 placeholder="Buscar..." 
                 className="pl-8 h-8 text-xs" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>

             <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
                {filteredQuestions.map(q => {
                   const isSelected = selectedQuestions.some(sq => sq.id === q.id);
                   return (
                      <div key={q.id} className={`p-3 border rounded-lg text-sm transition-colors ${isSelected ? 'border-indigo-200 bg-indigo-50/50 opacity-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                         <p className="font-semibold text-slate-800 mb-2 truncate" title={q.title}>{q.title}</p>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500">{q.subject} • {q.level} • {q.type === 'TRUE_FALSE' ? 'V/F' : q.type === 'OBJECTIVE' ? 'Objetiva' : 'Dissert.'}</span>
                            <Button 
                              size="sm" 
                              variant={isSelected ? "ghost" : "outline"} 
                              className={`h-6 px-2 text-xs ${isSelected ? 'text-indigo-600 font-bold' : ''}`}
                              onClick={() => !isSelected && handleAddQuestion(q)}
                              disabled={isSelected}
                            >
                               {isSelected ? "Adicionada" : <><Plus className="h-3 w-3 mr-1" /> Add</>}
                            </Button>
                         </div>
                      </div>
                   )
                })}
                {filteredQuestions.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">Nenhuma questão encontrada.</p>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
