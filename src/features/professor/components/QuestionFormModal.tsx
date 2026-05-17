"use client";

import { useState } from "react";
import { TeacherBankQuestion, QuestionType, QuestionDifficulty, QuestionStatus, Subject, TeacherBankQuestionOption } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function QuestionFormModal({ 
  question, 
  subjects, 
  onSave, 
  onClose 
}: { 
  question: TeacherBankQuestion | null, 
  subjects: Subject[], 
  onSave: (q: any) => void, 
  onClose: () => void 
}) {
  const [subjectId, setSubjectId] = useState(question?.subjectId || "");
  const [text, setText] = useState(question?.text || "");
  const [type, setType] = useState<QuestionType>(question?.type || "MULTIPLE_CHOICE");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>(question?.difficulty || "MEDIUM");
  const [status, setStatus] = useState<QuestionStatus>(question?.status || "PUBLISHED");
  const [tagsInput, setTagsInput] = useState(question?.tags.join(", ") || "");

  const [options, setOptions] = useState<Partial<TeacherBankQuestionOption>[]>(() =>
    question?.options || [
      { id: Date.now().toString() + "1", text: "", isCorrect: true, feedback: "" },
      { id: Date.now().toString() + "2", text: "", isCorrect: false, feedback: "" },
    ]
  );
  
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer ?? true);
  const [trueFalseFeedback, setTrueFalseFeedback] = useState(question?.trueFalseFeedback || "");
  
  const [expectedAnswer, setExpectedAnswer] = useState(question?.expectedAnswer || "");
  const [rubric, setRubric] = useState(question?.rubric || "");

  const handleSave = () => {
    if (!text.trim()) { toast.error("O enunciado é obrigatório."); return; }
    if (!subjectId) { toast.error("Selecione uma disciplina."); return; }

    if (type === 'MULTIPLE_CHOICE') {
      const hasCorrect = options.some(o => o.isCorrect);
      const allFilled = options.every(o => o.text?.trim() !== "");
      if (!hasCorrect) { toast.error("Selecione a alternativa correta."); return; }
      if (!allFilled) { toast.error("Preencha o texto de todas as alternativas."); return; }
    }
    
    if (type === 'ESSAY' && !expectedAnswer.trim()) { toast.error("A resposta esperada é obrigatória para questões dissertativas."); return; }

    const parsedTags = tagsInput.split(",").map(t => t.trim()).filter(t => t.length > 0);

    const data: Partial<TeacherBankQuestion> = {
      subjectId,
      subjectName: subjects.find(s => s.id === subjectId)?.name,
      text,
      type,
      difficulty,
      status,
      tags: parsedTags,
    };

    if (type === 'MULTIPLE_CHOICE') data.options = options as TeacherBankQuestionOption[];
    if (type === 'TRUE_FALSE') {
      data.correctAnswer = correctAnswer;
      data.trueFalseFeedback = trueFalseFeedback;
    }
    if (type === 'ESSAY') {
      data.expectedAnswer = expectedAnswer;
      data.rubric = rubric;
    }

    onSave(data);
  };

  const addOption = () => {
    setOptions([...options, { id: Date.now().toString(), text: "", isCorrect: false, feedback: "" }]);
  };
  const removeOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };
  const updateOption = (id: string, field: string, value: any) => {
    setOptions(options.map(o => {
      if (o.id === id) {
        if (field === 'isCorrect' && value === true) {
          // If making one true, others should be false
          return { ...o, isCorrect: true };
        }
        return { ...o, [field]: value };
      }
      if (field === 'isCorrect' && value === true) {
         return { ...o, isCorrect: false };
      }
      return o;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {question ? 'Editar Questão' : 'Nova Questão'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Disciplina</label>
              <Select value={subjectId} onValueChange={(val) => setSubjectId(val || '')}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Tipo</label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MULTIPLE_CHOICE">Múltipla Escolha</SelectItem>
                  <SelectItem value="TRUE_FALSE">Verdadeiro/Falso</SelectItem>
                  <SelectItem value="ESSAY">Dissertativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Dificuldade</label>
              <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Fácil</SelectItem>
                  <SelectItem value="MEDIUM">Média</SelectItem>
                  <SelectItem value="HARD">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Rascunho</SelectItem>
                  <SelectItem value="PUBLISHED">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Enunciado da Questão</label>
            <Textarea 
              className="min-h-[100px] border-slate-200"
              value={text} onChange={e=>setText(e.target.value)} 
              placeholder="Escreva a pergunta aqui..."
            />
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            
            {type === 'MULTIPLE_CHOICE' && (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800 text-sm">Alternativas</h3>
                  <Button variant="outline" size="sm" onClick={addOption} className="h-7 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    <Plus className="w-3 h-3 mr-1"/> Adicionar Alternativa
                  </Button>
                </div>
                <div className="space-y-3">
                  {options.map((opt, i) => (
                    <div key={opt.id} className={`p-3 rounded-lg border ${opt.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                      <div className="flex gap-3 items-start">
                        <button 
                          className={`mt-2 flex items-center justify-center w-5 h-5 rounded-full border ${opt.isCorrect ? 'bg-emerald-500 border-emerald-600 text-white' : 'border-slate-300 text-transparent hover:border-emerald-400'}`}
                          onClick={() => updateOption(opt.id!, 'isCorrect', true)}
                          title="Marcar como correta"
                        >
                          <Check className="w-3 h-3"/>
                        </button>
                        <div className="flex-1 space-y-2">
                          <Input 
                            value={opt.text} onChange={e=>updateOption(opt.id!, 'text', e.target.value)} 
                            placeholder={`Alternativa ${String.fromCharCode(65+i)}`}
                            className={`border-slate-200 ${opt.isCorrect ? 'focus-visible:ring-emerald-500' : ''}`}
                          />
                          <Input 
                            value={opt.feedback || ''} onChange={e=>updateOption(opt.id!, 'feedback', e.target.value)} 
                            placeholder="Feedback (opcional)"
                            className="h-8 text-xs border-slate-200 bg-slate-50"
                          />
                        </div>
                        {options.length > 2 && (
                          <button onClick={() => removeOption(opt.id!)} className="mt-2 text-slate-400 hover:text-red-500">
                             <Trash2 className="w-4 h-4"/>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {type === 'TRUE_FALSE' && (
              <div className="space-y-4">
                 <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg">
                   <div className="font-medium text-sm text-slate-700">A afirmação é:</div>
                   <div className="flex items-center gap-3">
                     <button
                       onClick={() => setCorrectAnswer(true)}
                       className={`px-4 py-1.5 rounded text-sm font-bold border transition-colors ${correctAnswer ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                     >VERDADEIRA</button>
                     <button
                       onClick={() => setCorrectAnswer(false)}
                       className={`px-4 py-1.5 rounded text-sm font-bold border transition-colors ${!correctAnswer ? 'bg-red-100 text-red-800 border-red-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                     >FALSA</button>
                   </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Feedback da Resposta (Opcional)</label>
                    <Textarea 
                      value={trueFalseFeedback} onChange={e=>setTrueFalseFeedback(e.target.value)}
                      placeholder="Explique o porquê desta resposta..."
                      className="border-slate-200 h-20"
                    />
                 </div>
              </div>
            )}

            {type === 'ESSAY' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Resposta Esperada</label>
                  <Textarea 
                    value={expectedAnswer} onChange={e=>setExpectedAnswer(e.target.value)}
                    placeholder="Gabarito da questão..."
                    className="border-slate-200 h-24"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Rubrica de Correção (Opcional)</label>
                  <Textarea 
                    value={rubric} onChange={e=>setRubric(e.target.value)}
                    placeholder="Critérios para pontuação..."
                    className="border-slate-200 h-20 text-sm"
                  />
                  <p className="text-xs text-slate-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>Auxilia o professor no momento de dar a nota.</p>
                </div>
              </div>
            )}

          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Tags (Separadas por vírgula)</label>
            <Input 
              value={tagsInput} onChange={e=>setTagsInput(e.target.value)}
              placeholder="Ex: Equações Lineares, Algebra, Ensino Médio"
              className="border-slate-200"
            />
          </div>

        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600">Cancelar</Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Salvar Questão</Button>
        </div>

      </div>
    </div>
  )
}
