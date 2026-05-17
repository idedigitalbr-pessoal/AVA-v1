"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDataTable, AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";
import { teachersService } from "@/lib/api/services/teacher.service";
import { Teacher } from "@/types";

export function CourseTeachersTab({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teachersService.list().then(data => {
      // Mock filter
      setTeachers(data.slice(0, 3));
      setLoading(false);
    });
  }, [courseId]);

  const columns = [
    { header: "Nome", accessor: (t: Teacher) => <span className="font-medium cursor-pointer hover:underline" onClick={() => router.push(`/admin/professores/${t.id}`)}>{t.name}</span> },
    { header: "Email", accessor: (t: Teacher) => t.email },
    { header: "Especialidade", accessor: (t: Teacher) => t.specialization || '-' },
  ];

  if (loading) return <AdminLoadingState text="Carregando professores..." />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Professores</h3>
          <p className="text-sm text-slate-500">Docentes vinculados a disciplinas deste curso.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/professores')}>
          Ver Todos
        </Button>
      </div>

      <AdminDataTable 
        columns={columns} 
        data={teachers} 
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhum professor vinculado."
        onEdit={(item) => router.push(`/admin/professores/${item.id}/editar`)}
        onView={(item) => router.push(`/admin/professores/${item.id}`)}
      />
    </div>
  );
}
