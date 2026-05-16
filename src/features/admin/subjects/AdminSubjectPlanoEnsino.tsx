import { useState } from "react";
import { Subject } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";
import { subjectsService } from "@/lib/api";

interface AdminSubjectPlanoEnsinoProps {
  subject: Subject;
}

export function AdminSubjectPlanoEnsino({ subject }: AdminSubjectPlanoEnsinoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    syllabus: subject.syllabus || "",
    objectives: subject.objectives || "",
    programmaticContent: subject.programmaticContent || "",
    methodology: subject.methodology || "",
    evaluationCriteria: subject.evaluationCriteria || "",
    basicBibliography: subject.basicBibliography || "",
    complementaryBibliography: subject.complementaryBibliography || "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await subjectsService.updateSubject(subject.id, formData);
      toast.success("Plano de ensino atualizado com sucesso!");
      setIsEditing(false);
    } catch {
      toast.error("Erro ao atualizar o plano de ensino.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      syllabus: subject.syllabus || "",
      objectives: subject.objectives || "",
      programmaticContent: subject.programmaticContent || "",
      methodology: subject.methodology || "",
      evaluationCriteria: subject.evaluationCriteria || "",
      basicBibliography: subject.basicBibliography || "",
      complementaryBibliography: subject.complementaryBibliography || "",
    });
    setIsEditing(false);
  };

  const renderSection = (title: string, field: keyof typeof formData) => (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{title}</h3>
      {isEditing ? (
        <Textarea 
          rows={5} 
          className="resize-y" 
          value={formData[field]} 
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} 
          placeholder={`Preencha o campo ${title.toLowerCase()}`}
        />
      ) : (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 min-h-[100px] whitespace-pre-wrap text-slate-700 text-sm">
          {formData[field] || <span className="text-slate-400 italic">Não preenchido.</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Plano de Ensino Matriz</h2>
          <p className="text-sm text-slate-500">Documento base para todas as turmas que cursarem esta disciplina.</p>
        </div>
        
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" /> Editar Plano
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleCancel} disabled={saving}>
              <X className="h-4 w-4 mr-2" /> Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" /> {saving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderSection("Ementa", "syllabus")}
        {renderSection("Objetivos", "objectives")}
        {renderSection("Conteúdo Programático", "programmaticContent")}
        {renderSection("Metodologia", "methodology")}
        {renderSection("Critérios de Avaliação", "evaluationCriteria")}
      </div>

      <div className="space-y-8 pt-8 border-t border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Referências Bibliográficas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderSection("Bibliografia Básica", "basicBibliography")}
          {renderSection("Bibliografia Complementar", "complementaryBibliography")}
        </div>
      </div>
    </div>
  );
}
