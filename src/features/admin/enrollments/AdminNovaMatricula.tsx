"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { enrollmentService } from "@/lib/api";
import { useStudents, useCourses, useClasses } from "@/hooks/use-queries";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { AdminPageHeader } from "../components";

export function AdminNovaMatricula() {
  const router = useRouter();
  const { data: students, isLoading: isStuLoading } = useStudents();
  const { data: courses, isLoading: isCouLoading } = useCourses();
  const { data: classes, isLoading: isClaLoading } = useClasses();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    classId: "",
  });

  const availableClasses = classes?.filter(c => c.courseId === formData.courseId) || [];

  const handleSave = async () => {
    if (!formData.userId || !formData.courseId) {
      toast.error("Preencha aluno e curso obrigatórios.");
      return;
    }

    setSaving(true);
    try {
      const resp = await enrollmentService.createEnrollment(formData);
      toast.success("Matrícula criada com sucesso!");
      router.push(`/admin/matriculas/${resp.id}`);
    } catch {
      toast.error("Erro ao criar matrícula.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/matriculas')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <AdminPageHeader 
        title="Nova Matrícula" 
        description="Vincular um aluno a um curso/turma." 
        action={
          <Button onClick={handleSave} disabled={saving || isStuLoading || isCouLoading}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Salvando..." : "Salvar Matrícula"}
          </Button>
        }
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Aluno *</label>
            <select
              title="Selecione um aluno"
              className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            >
              <option value="">Selecione um aluno</option>
              {students?.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.registrationNumber})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Curso *</label>
            <select
              title="Selecione um curso"
              className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value, classId: "" })}
            >
              <option value="">Selecione um curso</option>
              {courses?.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Turma (Opcional por enquanto)</label>
            <select
              title="Selecione uma turma"
              className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:opacity-50"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              disabled={!formData.courseId || availableClasses.length === 0}
            >
              <option value="">Selecione uma turma</option>
              {availableClasses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {formData.courseId && availableClasses.length === 0 && (
              <p className="text-xs text-amber-600">Este curso ainda não possui turmas ativas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
