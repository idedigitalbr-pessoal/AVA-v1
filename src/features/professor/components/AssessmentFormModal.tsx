"use client";

import { useState, useEffect } from "react";
import { TeacherAssessment, TeacherBankQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search, Plus, Trash2, Settings, Target } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ApiService } from "@/lib/api";

export function AssessmentFormModal({
  assessment,
  onSave,
  onClose
}: {
  assessment: TeacherAssessment | null;
  onSave: (data: any) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'SETTINGS' | 'QUESTIONS'>('SETTINGS');
  const [title, setTitle] = useState(assessment?.title || "");
  const [type, setType] = useState(assessment?.type || "QUIZ");
  const [description, setDescription] = useState(assessment?.description || "");
  const [timeLimit, setTimeLimit] = useState(assessment?.timeLimit?.toString() || "");
  const [maxAttempts, setMaxAttempts] = useState(assessment?.maxAttempts?.toString() || "1");
  const [weight, setWeight] = useState(assessment?.weight?.toString() || "1");
  const [maxScore, setMaxScore] = useState(assessment?.maxScore?.toString() || "10");
  const [shuffleQuestions, setShuffleQuestions] = useState(assessment?.shuffleQuestions ?? true);
  
  // Banco de questoes
  const [bankQuestions, setBankQuestions] = useState<TeacherBankQuestion[]>([]);
  const [searchBank, setSearchBank] = useState("");
  // Questões selecionadas
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(assessment?.questionIds || []);

  useEffect(() => {
    const loadBank = async () => {
      try {
        const q = await ApiService.teachers.getQuestions();
        setBankQuestions(q);
      } catch {
        toast.error("Erro ao carregar banco de questões.");
      }
    };
    loadBank();
  }, []);

  const handleSave = () => {
    if (!title.trim()) { toast.error("O título é obrigatório."); return; }
    if (selectedQuestionIds.length === 0) { toast.error("Selecione pelo menos uma questão."); return; }

    const data: Partial<TeacherAssessment> = {
      title,
      type: type as 'QUIZ' | 'EXAM',
      description,
      timeLimit: timeLimit ? parseInt(timeLimit) : undefined,
      maxAttempts: maxAttempts ? parseInt(maxAttempts) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      maxScore: parseFloat(maxScore || "10"),
      shuffleQuestions,
      questionIds: selectedQuestionIds,
      status: assessment?.status || 'DRAFT'
    };

    onSave(data);
  };

  const toggleQuestion = (id: string) => {
    if (selectedQuestionIds.includes(id)) {
      setSelectedQuestionIds(q => q.filter(x => x !== id));
    } else {
      setSelectedQuestionIds(q => [...q, id]);
    }
  };

  const filteredBank = bankQuestions.filter(q => q.text.toLowerCase().includes(searchBank.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {assessment ? 'Editar Avaliação' : 'Nova Avaliação'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setTab('SETTINGS')}
            className={`flex-1 py-3 text-sm font-semibold flex justify-center items-center gap-2 border-b-2 transition-colors ${tab === 'SETTINGS' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Settings className="w-4 h-4" /> Configurações
          </button>
          <button
            onClick={() => setTab('QUESTIONS')}
            className={`flex-1 py-3 text-sm font-semibold flex justify-center items-center gap-2 border-b-2 transition-colors ${tab === 'QUESTIONS' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Target className="w-4 h-4" /> Questões ({selectedQuestionIds.length})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {tab === 'SETTINGS' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Tipo</label>
                  <Select value={type} onValueChange={(val) => setType(val as "QUIZ" | "EXAM")}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUIZ">Quiz</SelectItem>
                      <SelectItem value="EXAM">Prova</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Título</label>
                  <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex: Prova Mensal" className="bg-white border-slate-200" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Descrição/Instruções</label>
                <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Instruções para os alunos..." className="bg-white border-slate-200 h-24" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Tempo Limite (min)</label>
                  <Input type="number" value={timeLimit} onChange={e=>setTimeLimit(e.target.value)} placeholder="Ex: 60" className="bg-white border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Tentativas Max.</label>
                  <Input type="number" value={maxAttempts} onChange={e=>setMaxAttempts(e.target.value)} className="bg-white border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Nota Máxima</label>
                  <Input type="number" value={maxScore} onChange={e=>setMaxScore(e.target.value)} className="bg-white border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Peso na Média</label>
                  <Input type="number" step="0.1" value={weight} onChange={e=>setWeight(e.target.value)} className="bg-white border-slate-200" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Embaralhar Questões</h4>
                  <p className="text-xs text-slate-500">Exibir questões em ordem aleatória para cada aluno.</p>
                </div>
                <Switch checked={shuffleQuestions} onCheckedChange={setShuffleQuestions} />
              </div>
            </div>
          )}

          {tab === 'QUESTIONS' && (
            <div className="flex flex-col h-full gap-4">
              <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-600 font-medium">
                  {selectedQuestionIds.length} questões selecionadas
                </div>
                <div className="w-64 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    value={searchBank} onChange={e=>setSearchBank(e.target.value)} 
                    placeholder="Buscar no banco..." 
                    className="pl-8 h-9 text-sm bg-slate-50 border-slate-200" 
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {filteredBank.map(q => {
                  const isSelected = selectedQuestionIds.includes(q.id);
                  return (
                    <div key={q.id} className={`p-4 rounded-lg border flex gap-4 transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <div className="pt-0.5">
                        <button 
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 text-transparent hover:border-indigo-400'}`}
                        >
                          <Plus className={`w-4 h-4 ${isSelected ? 'rotate-45' : ''} transition-transform`} />
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 items-center mb-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{q.subjectName || 'Geral'}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">{q.type}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">{q.difficulty}</span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium line-clamp-2">{q.text}</p>
                      </div>
                    </div>
                  );
                })}
                {filteredBank.length === 0 && (
                  <div className="text-center py-8 text-slate-500">Nenhuma questão encontrada.</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600">Cancelar</Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Salvar Avaliação</Button>
        </div>

      </div>
    </div>
  );
}
