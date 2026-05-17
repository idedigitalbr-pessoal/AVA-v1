"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDataTable, AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";

export function CourseAssessmentsTab({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Mock data for assessments
  const assessments = [
    { id: "1", title: "Prova N1", type: "Prova", subject: "Matemática", status: "Publicada" },
    { id: "2", title: "Quiz Módulo 1", type: "Quiz", subject: "História", status: "Agendada" }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    { header: "Título", accessor: (a: any) => a.title },
    { header: "Tipo", accessor: (a: any) => a.type },
    { header: "Disciplina", accessor: (a: any) => a.subject },
    { header: "Status", accessor: (a: any) => a.status },
  ];

  if (loading) return <AdminLoadingState text="Carregando avaliações..." />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Avaliações do Curso</h3>
          <p className="text-sm text-slate-500">Provas, quizzes e trabalhos.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/avaliacoes')}>
          Ver Central de Avaliações
        </Button>
      </div>

      <AdminDataTable 
        columns={columns} 
        data={assessments} 
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma avaliação encontrada."
      />
    </div>
  );
}
