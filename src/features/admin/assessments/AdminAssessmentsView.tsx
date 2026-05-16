"use client";

import { useEffect, useState } from "react";
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

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const filteredData = data.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || a.courseId === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title={title} 
        description={description} 
        action={
          <Can I="CREATE_CONTENT">
            <AdminCreateButton 
              label="Nova Avaliação" 
              onClick={() => toast.success("Abertura do modal de criação de avaliações")} 
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
          <div className="w-[200px]">
             <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os cursos</SelectItem>
                  <SelectItem value="c1">Engenharia de Software</SelectItem>
                  <SelectItem value="c2">Design Gráfico</SelectItem>
                  <SelectItem value="c4">Ciência da Computação</SelectItem>
                </SelectContent>
             </Select>
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
