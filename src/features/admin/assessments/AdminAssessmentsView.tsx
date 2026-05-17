"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminCreateButton, AdminFilterBar, AdminSearchInput, AdminLoadingState } from "../components";
import { AdminAssessmentsTabs } from "./AdminAssessmentsTabs";
import { AdminAssessmentsTable } from "./AdminAssessmentsTable";
import { Assessment } from "@/types";
import { assessmentsService } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Can } from "@/lib/auth/Can";

interface AdminAssessmentsViewProps {
  type: 'ASSIGNMENT' | 'QUIZ' | 'EXAM';
  title: string;
  description: string;
}

export function AdminAssessmentsView({ type, title, description }: AdminAssessmentsViewProps) {
  const [data, setData] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let assessments: Assessment[] = [];
      if (type === 'ASSIGNMENT') assessments = await assessmentsService.listAssignments();
      else if (type === 'QUIZ') assessments = await assessmentsService.listQuizzes();
      else if (type === 'EXAM') assessments = await assessmentsService.listExams();

      setData(assessments);
    } catch {
      toast.error("Erro ao carregar avaliações.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    fetchData();
  }, [type]);

  const filteredData = data.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || a.courseId === courseFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesTeacher = teacherFilter === 'all' || a.teacherId === teacherFilter;
    const matchesClass = classFilter === 'all' || a.classId === classFilter;
    const matchesSubject = subjectFilter === 'all' || a.subjectId === subjectFilter;
    return matchesSearch && matchesCourse && matchesStatus && matchesTeacher && matchesClass && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title={title} 
        description={description} 
        action={
          <Can I="CREATE_CONTENT">
            <AdminCreateButton 
              label={`Nova ${type === 'EXAM' ? 'Prova' : type === 'QUIZ' ? 'Quiz' : 'Atividade'}`} 
              onClick={() => toast.success("Modal de criação de avaliação aberto com sucesso!")} 
            />
          </Can>
        } 
      />

      <AdminAssessmentsTabs />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar pelo título..." 
          />
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div className="w-[160px] shrink-0">
               <Select value={courseFilter} onValueChange={(val) => setCourseFilter(val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cursos (Todos)</SelectItem>
                    <SelectItem value="c1">Engenharia de Software</SelectItem>
                    <SelectItem value="c2">Design Gráfico</SelectItem>
                    <SelectItem value="c4">Ciência da Computação</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="w-[140px] shrink-0">
               <Select value={classFilter} onValueChange={(val) => setClassFilter(val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Turmas (Todas)</SelectItem>
                    <SelectItem value="class1">Turma A - 2026</SelectItem>
                    <SelectItem value="class2">Turma B - 2026</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="w-[160px] shrink-0">
               <Select value={subjectFilter} onValueChange={(val) => setSubjectFilter(val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Disciplinas (Todas)</SelectItem>
                    <SelectItem value="sub1">Lógica de Programação</SelectItem>
                    <SelectItem value="sub3">Interface Humano Computador</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="w-[160px] shrink-0">
               <Select value={teacherFilter} onValueChange={(val) => setTeacherFilter(val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Profs (Todos)</SelectItem>
                    <SelectItem value="t1">Prof. Carlos Mendes</SelectItem>
                    <SelectItem value="t2">Prof. Julia Rocha</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="w-[130px] shrink-0">
               <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Status (Todos)</SelectItem>
                    <SelectItem value="DRAFT">Rascunho</SelectItem>
                    <SelectItem value="PUBLISHED">Publicado</SelectItem>
                    <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                  </SelectContent>
               </Select>
            </div>
          </div>
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando avaliações..." />
        ) : (
          <AdminAssessmentsTable type={type} data={filteredData} refetch={fetchData} />
        )}
      </div>
    </div>
  );
}
