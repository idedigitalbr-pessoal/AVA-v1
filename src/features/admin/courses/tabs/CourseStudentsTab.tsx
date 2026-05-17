"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminDataTable, AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";
import { studentsService } from "@/lib/api";
import { Student } from "@/types";

export function CourseStudentsTab({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentsService.list().then(data => {
      setStudents(data.slice(0, 5));
      setLoading(false);
    });
  }, [courseId]);

  const columns = [
    { header: "Nome", accessor: (s: Student) => <span className="font-medium cursor-pointer hover:underline" onClick={() => router.push(`/admin/alunos/${s.id}`)}>{s.name}</span> },
    { header: "Email", accessor: (s: Student) => s.email },
    { header: "Matrícula", accessor: (s: Student) => s.registrationNumber || '-' },
    { header: "Status", accessor: (s: Student) => s.status === 'ACTIVE' ? 'Ativo' : 'Inativo' },
  ];

  if (loading) return <AdminLoadingState text="Carregando alunos..." />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Alunos Matriculados</h3>
          <p className="text-sm text-slate-500">Alunos com vínculo ativo no curso.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/matriculas/nova')}>
          Vincular Aluno
        </Button>
      </div>

      <AdminDataTable 
        columns={columns} 
        data={students} 
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhum aluno neste curso."
        onEdit={(item) => router.push(`/admin/alunos/${item.id}/editar`)}
        onView={(item) => router.push(`/admin/alunos/${item.id}`)}
      />
    </div>
  );
}
