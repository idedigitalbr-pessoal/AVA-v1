"use client";

import { useState } from "react";
import { QuizQuestion, QuizOption } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, PlusCircle, Trash2, CheckCircle, Circle } from "lucide-react";

interface QuestionEditorProps {
  question?: Partial<QuizQuestion>;
  onSave: (question: QuizQuestion) => void;
  onCancel: () => void;
}

export function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [title, setTitle] = useState(question?.title || "");
  const [text, setText] = useState(question?.text || "");
  const [subject, setSubject] = useState(question?.subject || "Geral");
  const [category, setCategory] = useState(question?.category || "");
  const [level, setLevel] = useState(question?.level || "Médio");
  const [type, setType] = useState<'OBJECTIVE' | 'ESSAY' | 'TRUE_FALSE'>(question?.type || 'OBJECTIVE');
  
  const [options, setOptions] = useState<QuizOption[]>(question?.options || [
    { id: "opt1", text: "", isCorrect: true },
    { id: "opt2", text: "", isCorrect: false }
  ]);

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now().toString(), text: "", isCorrect: false }]);
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };

  const handleChangeOptionText = (id: string, newText: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, text: newText } : o));
  };

  const handleSetCorrectOption = (id: string) => {
    setOptions(options.map(o => ({ ...o, isCorrect: o.id === id })));
  };

  const handleTypeChange = (newType: 'OBJECTIVE' | 'ESSAY' | 'TRUE_FALSE') => {
    setType(newType);
    if (newType === 'TRUE_FALSE') {
      setOptions([
        { id: "opt_true", text: "Verdadeiro", isCorrect: true },
        { id: "opt_false", text: "Falso", isCorrect: false }
      ]);
    } else if (newType === 'OBJECTIVE' && options.length < 2) {
       setOptions([
        { id: "opt1", text: "", isCorrect: true },
        { id: "opt2", text: "", isCorrect: false }
      ]);
    }
  };

  const handleSave = () => {
    const q: QuizQuestion = {
      id: question?.id || Date.now().toString(),
      title,
      text,
      type,
      subject,
      category,
      level,
      options: type !== 'ESSAY' ? options : []
    };
    onSave(q);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <Button onClick={onCancel} variant="ghost" size="icon" className="text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="font-bold text-slate-900">{question?.id ? "Editar Questão" : "Nova Questão"}</div>
        </div>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="h-4 w-4 mr-2" /> Salvar Questão
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Título Curto</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Virtual DOM" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Categoria / Topico</label>
              <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="Ex: Conceitos, Prática" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-800">Disciplina</label>
               <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Ex: Frontend" />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-800">Dificuldade</label>
               <select 
                 value={level} 
                 onChange={e => setLevel(e.target.value)}
                 className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
               >
                 <option value="Fácil">Fácil</option>
                 <option value="Médio">Médio</option>
                 <option value="Difícil">Difícil</option>
               </select>
             </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Enunciado da Questão</label>
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            className="w-full h-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Digite aqui o contexto e a pergunta..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Tipo de Questão</label>
          <div className="flex gap-4">
             <label className="flex items-center gap-2 text-sm cursor-pointer">
               <input type="radio" checked={type === 'OBJECTIVE'} onChange={() => handleTypeChange('OBJECTIVE')} className="text-indigo-600 focus:ring-indigo-500" />
               Objetiva (Múltipla Escolha)
             </label>
             <label className="flex items-center gap-2 text-sm cursor-pointer">
               <input type="radio" checked={type === 'TRUE_FALSE'} onChange={() => handleTypeChange('TRUE_FALSE')} className="text-indigo-600 focus:ring-indigo-500" />
               Verdadeiro/Falso
             </label>
             <label className="flex items-center gap-2 text-sm cursor-pointer">
               <input type="radio" checked={type === 'ESSAY'} onChange={() => handleTypeChange('ESSAY')} className="text-indigo-600 focus:ring-indigo-500" />
               Dissertativa
             </label>
          </div>
        </div>

        {type !== 'ESSAY' && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
             <div className="flex items-center justify-between">
               <label className="text-sm font-semibold text-slate-800">Alternativas</label>
               {type === 'OBJECTIVE' && (
                 <Button onClick={handleAddOption} variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                   <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Alternativa
                 </Button>
               )}
             </div>
             
             <div className="space-y-3">
                {options.map((opt, index) => (
                  <div key={opt.id} className={`flex items-start gap-3 p-3 rounded-lg border ${opt.isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'}`}>
                     <button 
                       type="button" 
                       onClick={() => handleSetCorrectOption(opt.id)}
                       className="mt-2 text-slate-400 hover:text-emerald-600 focus:outline-none"
                       title="Marcar como correta"
                     >
                       {opt.isCorrect ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
                     </button>
                     <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase">Alternativa {String.fromCharCode(65 + index)}</span>
                          {opt.isCorrect && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">Resposta Correta</span>}
                        </div>
                        {type === 'TRUE_FALSE' ? (
                          <div className={`p-2 rounded font-medium ${opt.isCorrect ? 'text-emerald-800' : 'text-slate-700'}`}>
                            {opt.text}
                          </div>
                        ) : (
                          <Input 
                            value={opt.text} 
                            onChange={e => handleChangeOptionText(opt.id, e.target.value)} 
                            placeholder="Texto da alternativa..." 
                            className={opt.isCorrect ? 'border-emerald-200 bg-white' : 'bg-white'}
                          />
                        )}
                     </div>
                     {type === 'OBJECTIVE' && (
                       <button 
                         type="button" 
                         onClick={() => handleRemoveOption(opt.id)}
                         className="mt-8 text-slate-400 hover:text-red-500 focus:outline-none disabled:opacity-50"
                         title="Remover alternativa"
                         disabled={options.length <= 2}
                       >
                         <Trash2 className="h-4 w-4" />
                       </button>
                     )}
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
