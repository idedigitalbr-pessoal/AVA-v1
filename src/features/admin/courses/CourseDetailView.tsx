"use client";

import { useState } from "react";
import { Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { coursesService } from "@/lib/api";
import { toast } from "sonner";
import { AdminStatusBadge } from "../components";

interface CourseDetailViewProps {
  course: Course;
}

export function CourseDetailView({ course: initialCourse }: CourseDetailViewProps) {
  const router = useRouter();
  const [course, setCourse] = useState(initialCourse);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Visão Geral" },
    { id: "curriculum", label: "Matriz Curricular" },
    { id: "classes", label: "Turmas" },
    { id: "students", label: "Alunos" },
    { id: "teachers", label: "Professores" },
    { id: "content", label: "Conteúdo AVA" },
    { id: "assessments", label: "Avaliações" },
    { id: "certificates", label: "Certificados" },
    { id: "reports", label: "Relatórios" },
    { id: "settings", label: "Configurações" },
  ];

  const handlePublish = async () => {
    try {
      const updated = await coursesService.publishCourse(course.id);
      setCourse(updated);
      toast.success("Curso publicado com sucesso.");
    } catch {
      toast.error("Erro ao publicar.");
    }
  };

  const renderStatusBadge = (status?: string) => {
    if (status === 'PUBLISHED') return <AdminStatusBadge status="Publicado" variant="success" />;
    if (status === 'ARCHIVED') return <AdminStatusBadge status="Arquivado" variant="secondary" />;
    return <AdminStatusBadge status="Rascunho" variant="warning" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
            {renderStatusBadge(course.status)}
          </div>
          <p className="text-sm text-slate-500">
            {course.code && <span className="font-mono mr-3">[{course.code}]</span>}
            {course.modality} • {course.degree}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/cursos/${course.id}/editar`)}>
            Editar Curso
          </Button>
          {course.status !== 'PUBLISHED' && (
            <Button onClick={handlePublish} className="bg-emerald-600 hover:bg-emerald-700">
              Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 overflow-x-auto border-b border-slate-200 pb-px scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 min-h-[400px]">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Descrição</h3>
              <p className="text-slate-600">{course.description || "Nenhuma descrição fornecida."}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Turmas Ativas</p>
                <p className="text-2xl font-bold text-slate-900">{course.totalClasses || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Total de Alunos</p>
                <p className="text-2xl font-bold text-slate-900">{course.totalStudents}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Módulos/Disciplinas</p>
                <p className="text-2xl font-bold text-slate-900">{course.totalModules}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Carga Horária</p>
                <p className="text-2xl font-bold text-slate-900">{course.workload ? `${course.workload}h` : '-'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12">
            <p>O conteúdo da aba <strong>{tabs.find(t => t.id === activeTab)?.label}</strong> será implementado no futuro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
