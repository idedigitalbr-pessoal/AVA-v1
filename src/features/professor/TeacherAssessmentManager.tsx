"use client";

import { useState, useEffect } from "react";
import { TeacherAssessment } from "@/types";
import { ApiService } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Edit, Copy, Trash2, CheckCircle2, Clock, ArchiveX, Eye } from "lucide-react";
import { AssessmentFormModal } from "./components/AssessmentFormModal";
import { AssessmentAttemptsModal } from "./components/AssessmentAttemptsModal";
import { Input } from "@/components/ui/input";

export function TeacherAssessmentManager({ classSubjectId }: { classSubjectId: string }) {
  const [assessments, setAssessments] = useState<TeacherAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<TeacherAssessment | null>(null);
  
  const [isAttemptsOpen, setIsAttemptsOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.teachers.getAssessments(classSubjectId);
        setAssessments(data);
      } catch {
        toast.error("Erro ao carregar avaliações.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [classSubjectId]);

  const handleCreate = () => {
    setEditingAssessment(null);
    setIsFormOpen(true);
  };

  const handleEdit = (a: TeacherAssessment) => {
    setEditingAssessment(a);
    setIsFormOpen(true);
  };

  const handlePublish = async (id: string) => {
    try {
      await ApiService.teachers.publishAssessment(id);
      setAssessments(assessments.map(a => a.id === id ? { ...a, status: 'PUBLISHED' } : a));
      toast.success("Avaliação publicada com sucesso.");
    } catch {
      toast.error("Erro ao publicar avaliação.");
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const a = await ApiService.teachers.duplicateAssessment(id);
      const original = assessments.find(x => x.id === id);
      if (original) {
        setAssessments([{ ...original, id: a.id, title: original.title + " (Cópia)", status: 'DRAFT' }, ...assessments]);
        toast.success("Avaliação duplicada.");
      }
    } catch {
      toast.error("Erro ao duplicar.");
    }
  };

  const handleArchive = async (id: string) => {
    if (!confirm("Deseja arquivar esta avaliação?")) return;
    try {
      await ApiService.teachers.archiveAssessment(id);
      setAssessments(assessments.map(a => a.id === id ? { ...a, status: 'ARCHIVED' } : a));
      toast.success("Avaliação arquivada.");
    } catch {
      toast.error("Erro ao arquivar.");
    }
  };

  const handleSaveForm = async (data: any) => {
    try {
      if (editingAssessment) {
        const updated = await ApiService.teachers.updateAssessment(editingAssessment.id, data);
        setAssessments(assessments.map(a => a.id === updated.id ? updated : a));
        toast.success("Avaliação atualizada.");
      } else {
        const created = await ApiService.teachers.createAssessment(classSubjectId, data);
        setAssessments([created, ...assessments]);
        toast.success("Avaliação criada.");
      }
      setIsFormOpen(false);
    } catch {
      toast.error("Erro ao salvar avaliação.");
    }
  };

  const handleViewAttempts = (id: string) => {
    setSelectedAssessmentId(id);
    setIsAttemptsOpen(true);
  };

  const filtered = assessments.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  const getTypeLabel = (type: string) => {
    return type === 'EXAM' ? 'Prova' : 'Quiz';
  };
  const getTypeColor = (type: string) => {
    return type === 'EXAM' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Carregando avaliações...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Avaliações</h1>
          <p className="text-slate-500 mt-1">Gerencie quizzes e provas desta disciplina.</p>
        </div>
        <Button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700 shadow-sm text-white font-medium">
          <Plus className="mr-2 h-4 w-4" /> Nova Avaliação
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar avaliação..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getTypeColor(a.type)}`}>
                  {getTypeLabel(a.type)}
                </div>
                {a.status === 'DRAFT' && <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full uppercase">Rascunho</span>}
                {a.status === 'PUBLISHED' && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">Publicado</span>}
                {a.status === 'ARCHIVED' && <span className="text-[10px] bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full uppercase">Arquivado</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-800 line-clamp-2">{a.title}</h3>
              {a.description && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{a.description}</p>}
              
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center text-xs text-slate-600">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {a.timeLimit ? `${a.timeLimit} minutos` : 'Sem limite de tempo'}
                </div>
                <div className="flex items-center text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {a.maxScore} pontos max. ({a.questionIds.length} questões)
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => handleViewAttempts(a.id)} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium px-2">
                <Eye className="w-4 h-4 mr-1.5" /> Tentativas
              </Button>
              <div className="flex gap-1">
                {a.status === 'DRAFT' && (
                  <Button variant="ghost" size="sm" onClick={() => handlePublish(a.id)} title="Publicar" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2">
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => handleEdit(a)} title="Editar" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDuplicate(a.id)} title="Duplicar" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2">
                  <Copy className="w-4 h-4" />
                </Button>
                {a.status !== 'ARCHIVED' && (
                  <Button variant="ghost" size="sm" onClick={() => handleArchive(a.id)} title="Arquivar" className="text-slate-500 hover:text-orange-600 hover:bg-orange-50 px-2">
                    <ArchiveX className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <AssessmentFormModal 
          assessment={editingAssessment} 
          onSave={handleSaveForm} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}

      {isAttemptsOpen && selectedAssessmentId && (
        <AssessmentAttemptsModal 
          assessmentId={selectedAssessmentId} 
          onClose={() => { setIsAttemptsOpen(false); setSelectedAssessmentId(null); }} 
        />
      )}
    </div>
  );
}
